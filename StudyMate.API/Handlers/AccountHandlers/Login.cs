using Marten;
using MediatR;
using StudyMate.API.Models;
using StudyMate.API.Helper;

namespace StudyMate.API.Handlers.AccountHandlers
{
    public class Login
    {
        public class Request : IRequest<Response>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Response
        {
            public string UserId { get; set; }
    }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;

            public Handler(IDocumentSession session)
            {
                _session = session;
            }

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _session.Query<User>()
                    .FirstOrDefaultAsync(user => user.Email.Equals(request.Email) && user.Password.Equals(request.Password));
                
                if(user == null) {
                    throw new Exception("User not found");
                }

                return new Response
                {
                    UserId = user.Id.ToString()
                };
            }
        }
    }
}
