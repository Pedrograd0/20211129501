using OnlineExam.Models;
using OnlineExam.Models.Dto;

namespace OnlineExam.Interfaces
{
    public interface IAnswerService
    {

        Task<AnswerDto> CreateAnswer(AnswerDto answer);
        Task<List<AnswerDto>> GetAnswerQuestions(int QuestionId);
        Task<AnswerDto> UpdateAnswer(AnswerDto answer);
        Task<UserPointDto> UserAnswerSave(List<UserAnswerDto> answer,int userId);
        Task<List<UserPointDto>> UserAnswerPOint();
    }
}
