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
        public async Task<GetTasks.Response> GetTasks() => await _sender.Send(new GetTasks.Request());

        [HttpGet("{taskId}")]
        public async Task<GetTask.Response> GetTask(Guid taskId) => await _sender.Send(new GetTask.Request { Id = taskId });

        [HttpPost("create")]
        public async Task<CreateTask.Response> CreateTask([FromBody] CreateTask.Request newTask) => await _sender.Send(newTask);

        [HttpPut("update/{taskId}")]
        public async Task<UpdateTask.Response> UpdateTask(Guid taskId, [FromBody] UpdateTask.Request newTask)
        {
            newTask.Id = taskId;
            return await _sender.Send(newTask);
        }

        [HttpDelete("delete/{taskId}")]
        public async Task<DeleteTask.Response> DeleteTask(Guid taskId) => await _sender.Send(new DeleteTask.Request { Id = taskId });
    }
}
