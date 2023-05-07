using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using OnlineExam.Interfaces;
using OnlineExam.Models;
using OnlineExam.Models.Dto;
using OnlineExam.Persistance;

namespace OnlineExam.Services
{
    public class AnswerService : IAnswerService
    {

        private readonly OnlineExamDbContext _context;
        private readonly IMapper _mapper;
        public AnswerService(OnlineExamDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<AnswerDto> CreateAnswer(AnswerDto answer)
        {
            var Mappers = _mapper.Map<Answer>(answer);
            _context.Answers.Add(Mappers);
            var result = await _context.SaveChangesAsync();
            if (result > 0) return _mapper.Map<AnswerDto>(Mappers);
            throw new Exception("Not Added Question");
        }

        public async Task<List<AnswerDto>> GetAnswerQuestions(int QuestionId)
        {
            return await _context.Answers.Where(i => i.QuestionId == QuestionId)
                      .ProjectTo<AnswerDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<AnswerDto> UpdateAnswer(AnswerDto answer)
        {
            var dbQuestion = await _context.Answers.FirstOrDefaultAsync(i => i.Id == answer.Id);
            if (dbQuestion == null)
                throw new Exception("Order not found");

            _mapper.Map(answer, dbQuestion);
            await _context.SaveChangesAsync();

            return _mapper.Map<AnswerDto>(dbQuestion);
        }

        public async Task<UserPointDto> UserAnswerSave(List<UserAnswerDto> answer,int userID)
        {
            var checkUser = _context.UserPoints.Where(x => x.UserId == answer.FirstOrDefault().UserId);
            foreach (var item in answer)
            {
                var Mappers = _mapper.Map<UserAnswer>(item);
                if (checkUser is not null)
                {
                    await _context.UserAnswers.AddAsync(Mappers);
                }
                else
                {
                     _context.UserAnswers.Update(Mappers);
                }

            }
          
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                var userPoint = await Calculator(answer.Select(x => x.AnswerId).ToList());
                var model = new UserPoint()
                {
                    TotalPoint = userPoint,
                    UserId = userID
                };
                var resultUser = new UserPoint();
                if (checkUser is not null) resultUser = _context.UserPoints.Add(model).Entity;
                else resultUser = _context.UserPoints.Update(model).Entity;

                var res = await _context.SaveChangesAsync();
                if (res > 0) return _mapper.Map<UserPointDto>(resultUser);
            }
           
            throw new Exception("Not Added Answer");
        }

        public async Task<List<UserPointDto>> UserAnswerPOint()
        {
           var response =  await _context.UserPoints
                .Include(x=>x.User)
                .ToListAsync();
            
            if (response.Count > 0) return _mapper.Map<List<UserPointDto>>(response);
            throw new Exception("Not Added Answer");
        }

        private async Task<decimal> Calculator(List<int> answer)
        {
            var userResponse = answer;
            var answerRes = await _context.Answers
                .Where(x => userResponse.Contains(x.Id))
                .Select(x=>x.TrueAnswer)
                .ToListAsync();
            var falseAnswer = answerRes.Where(x => x == false).Count();
            var trueAnswer = answerRes.Where(x => x == true).Count();
            decimal calculator = (100 * trueAnswer)/ answerRes.Count();
            return calculator;
        }
    }
}
