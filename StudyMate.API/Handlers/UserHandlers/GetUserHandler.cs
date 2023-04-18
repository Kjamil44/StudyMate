using StudyMate.API.Models;
using Marten;
using MediatR;

namespace StudyMate.API.Handlers.UserHandlers
{
    public class GetUser
    {
        public class Request : IRequest<Response>
        {
            public Guid UserId { get; set; }
        }
        public class Response
        {
            public Guid UserId { get; set; }
            public string Name { get; set; }
            public string Surname { get; set; }
            public string Email { get; set; }
        }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            public Handler(IDocumentSession session) => _session = session;
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _session.LoadAsync<User>(request.UserId);
                if (user == null)
                    throw new Exception("User not found");

                return new Response
                {
                    UserId = user.Id,
                    Name = user.Name,   
                    Surname = user.Surname,
                    Email = user.Email
                };
            }
        }
    }
}
