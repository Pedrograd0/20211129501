using OnlineExam.Models.Enums;
using System.Text.Json.Serialization;

namespace OnlineExam.Models.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public RoleType Role { get; set; }
        public bool IsActive { get; set; }
    }

    
}
