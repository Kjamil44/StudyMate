using MediatR;
using Microsoft.AspNetCore.Mvc;
using StudyMate.API.Handlers.TaskHandlers;

namespace StudyMate.API.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController : Controller
    {
        private readonly ISender _sender;
        public TaskController(ISender sender) => _sender = sender;

        [HttpGet("all")]
        public async Task<IActionResult> GetTasks() => Ok(await _sender.Send(new GetTasks.Request()));

        [HttpGet("{taskId}")]
        public async Task<IActionResult> GetTask(Guid taskId) => Ok(await _sender.Send(new GetTask.Request { Id = taskId }));

        [HttpPost("create")]
        public async Task<IActionResult> CreateTask([FromBody] CreateTask.Request newTask) => Ok(await _sender.Send(newTask));

        [HttpPut("update/{taskId}")]
        public async Task<IActionResult> UpdateTask(Guid taskId, [FromBody] UpdateTask.Request newTask)
        {
            newTask.Id = taskId;
            return Ok(await _sender.Send(newTask));
        }

        [HttpDelete("delete/{taskId}")]
        public async Task<IActionResult> DeleteTask(Guid taskId) => Ok(await _sender.Send(new DeleteTask.Request { Id = taskId }));
    }
}
