using StudyMate.API.Models;
using Marten;
using MediatR;

namespace StudyMate.API.Handlers.UserHandlers
{
    public class UpdateUser
    {
        public class Request : IRequest<Response>
        {
            public Guid UserId { get; set; }
            public string? Name { get; set; }
            public string? Surname { get; set; }
            public string? Email { get; set; }
            public string? Password { get; set; }
        }
        public class Response
        {
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

                user.UpdateUser(request.Name, request.Surname, request.Email, request.Password);
                _session.Store(user);
                await _session.SaveChangesAsync();
                return new Response();
            }
        }
    }
}
