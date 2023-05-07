using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineExam.Interfaces;
using OnlineExam.Models.Dto;

namespace OnlineExam.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;


        public UserController(IUserService UserService)
        {
            userService = UserService;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<UserLoginResponse> Login(UserLoginRequest UserRequest)
        {
            return await userService.Login(UserRequest.Email, UserRequest.Password);
        }

        [HttpPost("Create")]
        public async Task<UserDto> CreateUser([FromBody] UserDto User)
        {
            return await userService.CreateUser(User);
        }
    }
}
