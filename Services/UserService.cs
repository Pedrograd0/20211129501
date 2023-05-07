using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineExam.Extensions;
using OnlineExam.Interfaces;
using OnlineExam.Models;
using OnlineExam.Models.Dto;
using OnlineExam.Persistance;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace OnlineExam.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper mapper;
        private readonly OnlineExamDbContext context;
        private readonly IConfiguration configuration;

        public UserService(IMapper Mapper, OnlineExamDbContext Context, IConfiguration Configuration)
        {
            mapper = Mapper;
            context = Context;
            configuration = Configuration;
        }

        public async Task<UserDto> CreateUser(UserDto Userdto)
        {
            var dbUser = await context.Users.Where(i => i.Id == Userdto.Id).FirstOrDefaultAsync();

            if (dbUser != null)
                throw new Exception("User already exists");

            dbUser = mapper.Map<User>(Userdto);

            await context.Users.AddAsync(dbUser);
            int result = await context.SaveChangesAsync();
            //dbUser pass degistir
            return mapper.Map<UserDto>(dbUser);
        }

        public async Task<UserLoginResponse> Login(string EMail, string Password)
        { // Veritabanı Kullanıcı Doğrulama İşlemleri Yapıldı.

            var encryptedPassword = PasswordEncrypter.Encrypt(Password);

            var dbUser = await context.Users.FirstOrDefaultAsync(i => i.Email == EMail && i.Password == encryptedPassword);

            if (dbUser == null)
                throw new Exception("User not found or given information is wrong");

            if (!dbUser.IsActive)
                throw new Exception("User state is Passive!");


            UserLoginResponse result = new UserLoginResponse();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSecurityKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiry = DateTime.Now.AddDays(int.Parse(configuration["JwtExpiryInDays"].ToString()));

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, EMail),
                new Claim(ClaimTypes.Name, dbUser.FirstName + " " + dbUser.LastName),
                new Claim(ClaimTypes.UserData, dbUser.Id.ToString())
            };

            var token = new JwtSecurityToken(configuration["JwtIssuer"], configuration["JwtAudience"], claims, null, expiry, creds);

            result.ApiToken = new JwtSecurityTokenHandler().WriteToken(token);
            dbUser.Password = string.Empty;
            result.User = mapper.Map<UserDto>(dbUser);

            return result;
        }
    }
}
