using MediatR;
using Microsoft.AspNetCore.Mvc;
using StudyMate.API.Handlers.NoteHandlers;

namespace StudyMate.API.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly ISender _sender;
        public NoteController(ISender sender) => _sender = sender;

        [HttpGet("all")]
        public async Task<GetNotes.Response> GetNotes() => await _sender.Send(new GetNotes.Request());

        [HttpGet("{noteId}")]
        public async Task<GetNote.Response> GetNote(Guid noteId) => await _sender.Send(new GetNote.Request { Id = noteId });

        [HttpPost("create")]
        public async Task<CreateNote.Response> CreateNote([FromBody] CreateNote.Request newNote) => await _sender.Send(newNote);

        [HttpPut("update/{noteId}")]
        public async Task<UpdateNote.Response> UpdateNote(Guid noteId, [FromBody] UpdateNote.Request newNote)
        {
            newNote.Id = noteId;
            return await _sender.Send(newNote);
        }

        [HttpDelete("delete/{subjectId}")]
        public async Task<DeleteNote.Response> DeleteNote(Guid noteId) => await _sender.Send(new DeleteNote.Request { Id = noteId });
    }
}
