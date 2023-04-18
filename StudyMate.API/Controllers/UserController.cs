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
        public async Task<GetUsers.Response> GetUsers() => await _sender.Send(new GetUsers.Request());

        [HttpGet("{userId}")]
        public async Task<GetUser.Response> GetUser(Guid userId) => await _sender.Send(new GetUser.Request { UserId = userId });

        [HttpPost("create")]
        public async Task<CreateUser.Response> CreateUser([FromBody] CreateUser.Request newUser) => await _sender.Send(newUser);

        [HttpPut("update/{userId}")]
        public async Task<UpdateUser.Response> UpdateUser(Guid userId, [FromBody] UpdateUser.Request newUser)
        {
            newUser.UserId = userId;
            return await _sender.Send(newUser);
        }

        [HttpDelete("delete/{userId}")]
        public async Task<DeleteUser.Response> DeleteUser(Guid userId) => await _sender.Send(new DeleteUser.Request { UserId = userId });
    }
}
