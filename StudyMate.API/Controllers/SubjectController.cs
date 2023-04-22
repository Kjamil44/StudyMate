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

        [HttpGet("all")]
        public async Task<GetSubjects.Response> GetSubjects() => await _sender.Send(new GetSubjects.Request());

        [HttpGet("{subjectId}")]
        public async Task<GetSubject.Response> GetSubject(Guid subjectId) => await _sender.Send(new GetSubject.Request { Id = subjectId });

        [HttpPost("create")]
        public async Task<CreateSubject.Response> CreateSubject([FromBody] CreateSubject.Request newSubject) => await _sender.Send(newSubject);

        [HttpPut("update/{subjectId}")]
        public async Task<UpdateSubject.Response> UpdateSubject(Guid subjectId, [FromBody] UpdateSubject.Request newSubject)
        {
            newSubject.Id = subjectId;
            return await _sender.Send(newSubject);
        }

        [HttpDelete("delete/{subjectId}")]
        public async Task<DeleteSubject.Response> DeleteSubject(Guid subjectId) => await _sender.Send(new DeleteSubject.Request { Id = subjectId});
    }
}
