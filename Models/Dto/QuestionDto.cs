using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OnlineExam.Models.Dto
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string QuestionUser { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool QuestionActive { get; set; }
        public ICollection<AnswerDto> Answers { get; set; }
    }
}
