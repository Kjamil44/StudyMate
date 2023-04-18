using StudyMate.API.Models;
using Marten;
using MediatR;

namespace StudyMate.API.Handlers.UserHandlers
{
    public class DeleteUser
    {
        public class Request : IRequest<Response>
        {
            public Guid UserId { get; set; }
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
                var user = await _session.Query<User>()
                    .FirstOrDefaultAsync(x => x.Id == request.UserId);

                if (user == null)
                    throw new Exception("User not found");

                _session.Delete(user);
                await _session.SaveChangesAsync();
                return new Response();
            }
        }
    }
}
