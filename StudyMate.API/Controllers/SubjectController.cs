using MediatR;
using Microsoft.AspNetCore.Mvc;
using StudyMate.API.Handlers.SubjectHandlers;

namespace StudyMate.API.Controllers
{
  [Route("api/subjects")]
  [ApiController]
  public class SubjectController : ControllerBase
  {
    private readonly ISender _sender;
    public SubjectController(ISender sender) => _sender = sender;

    [HttpGet("all/{userId}")]
    public async Task<IActionResult> GetSubjects(Guid userId) => Ok(await _sender.Send(new GetSubjects.Request { UserId = userId }));

    [HttpGet("{subjectId}")]
    public async Task<IActionResult> GetSubject(Guid subjectId) => Ok(await _sender.Send(new GetSubject.Request { Id = subjectId }));

    [HttpPost("create")]
    public async Task<IActionResult> CreateSubject([FromBody] CreateSubject.Request newSubject) => Ok(await _sender.Send(newSubject));

    [HttpPut("update/{subjectId}")]
    public async Task<IActionResult> UpdateSubject(Guid subjectId, [FromBody] UpdateSubject.Request newSubject)
    {
      newSubject.Id = subjectId;
      return Ok(await _sender.Send(newSubject));
    }

    [HttpDelete("delete/{subjectId}")]
    public async Task<IActionResult> DeleteSubject(Guid subjectId) => Ok(await _sender.Send(new DeleteSubject.Request { Id = subjectId }));
  }
}
