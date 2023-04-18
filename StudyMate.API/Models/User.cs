using Marten.Schema;

namespace StudyMate.API.Models
{
    public class User
    {
        [Identity]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public User(string name, string surname, string email, string password)
        {
            Id = Guid.NewGuid();
            Name = name;
            Surname = surname;
            Email = email;
            Password = password;
        } 
        public void UpdateUser(string name, string surname, string email, string password)
        {
            Name = name ?? Name;
            Surname = surname ?? Surname;
            Email = email ?? Email;
            Password = password ?? Password;
        }
    }
}
