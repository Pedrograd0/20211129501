namespace OnlineExam.Models.Dto
{
    public class UserLoginResponse
    {
        public String ApiToken { get; set; }

        public UserDto User { get; set; }
    }
}
