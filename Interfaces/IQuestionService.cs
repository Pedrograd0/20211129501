using OnlineExam.Models;
using OnlineExam.Models.Dto;

namespace OnlineExam.Interfaces
{
    public interface IQuestionService
    {
        Task<QuestionDto> CreateQuestion(QuestionDto question);
        Task<QuestionDto> UpdateQuestion(QuestionDto question);
        Task<bool> DeleteQuestion(int QuestionId);
        Task<QuestionDto> GetQuestionById(int QuestionId);
        Task<List<QuestionDto>> GetQuestions();
    }
}
