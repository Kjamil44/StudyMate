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
        public async Task<IActionResult> GetNotes() => Ok(await _sender.Send(new GetNotes.Request()));

        [HttpGet("{noteId}")]
        public async Task<IActionResult> GetNote(Guid noteId) => Ok(await _sender.Send(new GetNote.Request { Id = noteId }));

        [HttpPost("create")]
        public async Task<IActionResult> CreateNote([FromBody] CreateNote.Request newNote) => Ok(await _sender.Send(newNote));

        [HttpPut("update/{noteId}")]
        public async Task<IActionResult> UpdateNote(Guid noteId, [FromBody] UpdateNote.Request newNote)
        {
            newNote.Id = noteId;
            return Ok(await _sender.Send(newNote));
        }

        [HttpDelete("delete/{noteId}")]
        public async Task<IActionResult> DeleteNote(Guid noteId) => Ok(await _sender.Send(new DeleteNote.Request { Id = noteId }));
    }
}
