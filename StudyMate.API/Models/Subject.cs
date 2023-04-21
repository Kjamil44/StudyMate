using Marten.Schema;
using Microsoft.VisualBasic;
using StudyMate.API.Enums;

namespace StudyMate.API.Models
{
    public class Subject
    {
        [ForeignKey(typeof(User))]
        public Guid UserId { get; set; }
        [Identity]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Grade { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Status Status { get; set; }

        public Subject(Guid userId, string name, string description, int grade, DateTime startDate, DateTime endDate, Status status)
        {
            UserId = userId;
            Id = Guid.NewGuid();
            Name = name;
            Description = description;
            Grade = grade;
            StartDate = startDate;
            EndDate = endDate;
            Status = status;
        }

        public void UpdateSubject(string? name, string? description, int? grade, DateTime? startDate, DateTime? endDate, Status? status)
        {
            Name = name ?? Name;
            Description = description ?? Description;
            Grade = grade ?? Grade;
            StartDate = startDate ?? StartDate;
            EndDate = endDate ?? EndDate;
            Status = status ?? Status;
        }
    }
}
