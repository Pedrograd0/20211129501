using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineExam.Interfaces;
using OnlineExam.Models.Dto;

namespace OnlineExam.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionController : Controller
    {

        private readonly IQuestionService _question;

        public QuestionController(IQuestionService question)
        {
            _question= question;
        }


        [HttpPost("Create")]
        public async Task<QuestionDto> CreateQuestion(QuestionDto question)
        {
            return await _question.CreateQuestion(question);

        }


        [HttpPost("Delete")]
        public async Task DeleteQuestion([FromBody] int QuestionId)
        {
            await _question.DeleteQuestion(QuestionId);
        }


        [HttpGet("QuestionById")]
        public async Task<QuestionDto?> GetQuestionById(int QuestionId)
        {
            return await _question.GetQuestionById(QuestionId);
        }


        [HttpGet("Questions")]
        public async Task<List<QuestionDto>?> GetQuestions()
        {
           return await _question.GetQuestions();
        }


        [HttpPost("Update")]
        public async Task<QuestionDto> UpdateQuestion(QuestionDto question)
        {
            return await _question.UpdateQuestion(question);
        }
    }
}
