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

        public Task(Guid subjectId, string title, string description, DateTime dateCreated, DateTime dueDate, PriorityLevel priorityLevel, Status status)
        {
            Id = Guid.NewGuid();
            SubjectId = subjectId;
            Title = title;
            Description = description;
            DateCreated = dateCreated;
            DueDate = dueDate;
            PriorityLevel = priorityLevel;
            Status = status;
        }
        
        public void UpdateTask(string? title, 
            string? description, 
            DateTime? dateCreated, 
            DateTime? dueDate, 
            PriorityLevel? priorityLevel, 
            Status? status)
        {
            if (!string.IsNullOrEmpty(title))
                Title = title;
            if (!string.IsNullOrEmpty(description))
                Description = description;
            if (dateCreated.HasValue)
                DateCreated = dateCreated.Value;
            if (dueDate.HasValue)
                DueDate = dueDate.Value;
            if (priorityLevel.HasValue)
                PriorityLevel = priorityLevel.Value;
            if (status.HasValue)
                Status = status.Value;
        }
    }
}
