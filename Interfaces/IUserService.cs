using OnlineExam.Models.Dto;

namespace OnlineExam.Interfaces
{
    public interface IUserService
    {
        public Task<UserDto> CreateUser(UserDto User);
        public Task<UserLoginResponse> Login(string EMail, string Password);

    }
}
