using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineExam.Interfaces;
using OnlineExam.Models;
using OnlineExam.Models.Dto;

namespace OnlineExam.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnswerController : Controller
    {

        private readonly IAnswerService _answer;

        public AnswerController(IAnswerService answer)
        {
            _answer = answer;
        }

        [HttpPost("AddedAnswer")]
        public async Task<AnswerDto> CreateAnswer(AnswerDto answer)
        {
            return await _answer.CreateAnswer(answer);
        }

        [HttpGet("AnswerByQuestion")]

        public async Task<List<AnswerDto>> GetAnswerQuestions(int QuestionId)
        {
            return await _answer.GetAnswerQuestions(QuestionId);
        }

        [HttpPost("Update")]

        public async Task<AnswerDto> UpdateAnswer(AnswerDto answer)
        {
            return await _answer.UpdateAnswer(answer);
        }


        [HttpPost("AnswerSave/{userID}")]
        public async Task<UserPointDto> UserAnswerSave(List<UserAnswerDto> answer, int userID)
        {
            return await _answer.UserAnswerSave(answer,userID);
        }

        [HttpGet("UserAnswerPoint")]

        public async Task<List<UserPointDto>> GetUserPoint()
        {
            return await _answer.UserAnswerPOint();
        }
    }
}
