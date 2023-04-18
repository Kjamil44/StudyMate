using Marten.Schema;
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
    }
}
