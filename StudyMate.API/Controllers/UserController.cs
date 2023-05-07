using MediatR;
using Microsoft.AspNetCore.Mvc;
using StudyMate.API.Handlers.UserHandlers;

namespace StudyMate.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ISender _sender;
        public UserController(ISender sender) => _sender = sender;

        [HttpGet("all")]
        public async Task<IActionResult> GetUsers() => Ok(await _sender.Send(new GetUsers.Request()));

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(Guid userId) => Ok(await _sender.Send(new GetUser.Request { UserId = userId }));

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUser.Request newUser) => Ok(await _sender.Send(newUser));

        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, [FromBody] UpdateUser.Request newUser)
        {
            newUser.UserId = userId;
            return Ok(await _sender.Send(newUser));
        }

        [HttpDelete("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId) => Ok(await _sender.Send(new DeleteUser.Request { UserId = userId }));
    }
}
