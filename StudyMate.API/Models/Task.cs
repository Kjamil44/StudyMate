using Marten.Schema;
using StudyMate.API.Enums;

namespace StudyMate.API.Models
{
    public class Task
    {
        [ForeignKey(typeof(Subject))]
        public Guid SubjectId { get; set; }
        [Identity]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DueDate { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        public Status Status { get; set; }
    }
}
