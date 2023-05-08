using MediatR;
using Microsoft.AspNetCore.Mvc;
using StudyMate.API.Handlers.AccountHandlers;

namespace StudyMate.API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ISender _sender;
        public AccountController(ISender sender) => _sender = sender;

        [HttpPost("login")]
        public async Task<IActionResult> login([FromBody] Login.Request body) => Ok(await _sender.Send(body));
    }
}
