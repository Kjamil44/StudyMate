using StudyMate.API.Enums;

namespace StudyMate.API.Models
{
    public class Task
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DueDate { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        public Status Status { get; set; }
        public Guid SubjectId { get; set; }
    }
}
