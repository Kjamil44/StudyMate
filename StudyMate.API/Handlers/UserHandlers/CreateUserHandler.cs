using StudyMate.API.Models;
using Marten;
using MediatR;

namespace StudyMate.API.Handlers.UserHandlers
{
    public class CreateUser
    {
        public class Request : IRequest<Response>
        {
            public string Name { get; set; }
            public string Surname { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }
        public class Response
        {
            public Guid UserId { get; set; }
        }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            public Handler(IDocumentSession session) => _session = session;

            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var userAlreadyExists = await _session.Query<User>().FirstOrDefaultAsync(x => x.Email == request.Email);
                if(userAlreadyExists != null)
                {
                    throw new Exception("User already exists.");
                }

                var user = new User(request.Name, request.Surname, request.Email, request.Password);
                _session.Store(user);

                await _session.SaveChangesAsync();
                return new Response
                {
                    UserId = user.Id
                };
            }
        }
    }
}
