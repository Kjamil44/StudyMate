using Marten.Schema;

namespace StudyMate.API.Models
{
    public class Note
    {
        [Identity]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid BelongsId { get; set; }
    }
}
