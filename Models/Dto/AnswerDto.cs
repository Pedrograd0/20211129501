namespace OnlineExam.Models.Dto
{
    public class AnswerDto
    {
        public int Id { get; set; }
        public string QuestonAnswer { get; set; }
        public int QuestionId { get; set; }
        public QuestionDto? Question { get; set; }
        public bool TrueAnswer { get; set; }
    }
}
