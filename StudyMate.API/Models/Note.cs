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
        public string BelongsModel { get; set; }

        public Note(string title, string description, Guid belongsId, string belongsModel)
        {
            Id = Guid.NewGuid();
            Title = title;
            Description = description;
            BelongsId = belongsId;
            BelongsModel = belongsModel;
        }

        public void UpdateNote(string? title, string? description)
        {
            Title = title ?? Title;
            Description = description ?? Description;
        }
    }
}
