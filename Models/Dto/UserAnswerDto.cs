using OnlineExam.Models.Dto;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineExam.Models
{
    public class UserAnswerDto
    {
        public int Id { get; set; }
        public int AnswerId { get; set; }
        public AnswerDto? Answer { get; set; }
        public int QuestionId { get; set; }
        public QuestionDto? Question { get; set; }
        public int UserId { get; set; }
        public UserDto? User { get; set; }
        public DateTime AnswerDate { get; set; }
    }
}
