using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using OnlineExam.Interfaces;
using OnlineExam.Models;
using OnlineExam.Models.Dto;
using OnlineExam.Persistance;
using System.ComponentModel;

namespace OnlineExam.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly OnlineExamDbContext _context;
        private readonly IMapper _mapper;
        public QuestionService(OnlineExamDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<QuestionDto> CreateQuestion(QuestionDto question)
        {
            var Mappers = _mapper.Map<Question>(question);
            var aa = _context.Questions.Add(Mappers);
            var result = await _context.SaveChangesAsync();
            if (result > 0) return _mapper.Map<QuestionDto>(question);
            throw new Exception("Not Added Question");

        }

        public async Task<bool> DeleteQuestion(int QuestionId)
        {
            
            var question = await _context.Questions.FirstOrDefaultAsync(i => i.Id == QuestionId);
            if (question == null)
                throw new Exception("Order not found");


            _context.Questions.Remove(question);

            var response = await _context.SaveChangesAsync();
            if (response > 0) return true;
            return false;
        }

        public async Task<QuestionDto?> GetQuestionById(int QuestionId)
        {
            return await _context.Questions.Include(x=>x.Answers).Where(x => x.QuestionActive)
                      .ProjectTo<QuestionDto>(_mapper.ConfigurationProvider)
                      .FirstOrDefaultAsync();
        }

        public async Task<List<QuestionDto>?> GetQuestions()
        {
            return await _context.Questions.Include(x => x.Answers)
                .Where(x=>x.QuestionActive)
                      .ProjectTo<QuestionDto>(_mapper.ConfigurationProvider)
                      .ToListAsync();
        }

        public async Task<QuestionDto> UpdateQuestion(QuestionDto question)
        {
            var dbQuestion = await _context.Questions.Include(x => x.Answers).FirstOrDefaultAsync(i => i.Id == question.Id);
            if (dbQuestion == null)
                throw new Exception("Order not found");

            _mapper.Map(question, dbQuestion);
            await _context.SaveChangesAsync();

            return _mapper.Map<QuestionDto>(question);
        }
    }
}
