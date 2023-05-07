using OnlineExam.Models.Dto;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineExam.Models
{
    public class UserPointDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public UserDto? User { get; set; }
        public decimal TotalPoint { get; set; }
    }
}
