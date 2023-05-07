using System.Text;

namespace OnlineExam.Extensions
{
    public class PasswordEncrypter
    {
        public static String Encrypt(String Password)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(Password);
            return Convert.ToBase64String(plainTextBytes);
        }
    }
}
