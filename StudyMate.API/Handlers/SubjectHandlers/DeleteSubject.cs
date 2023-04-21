using Marten;
using MediatR;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.SubjectHandlers
{
    public class DeleteSubject
    {
        public class Request : IRequest<Response>
        {
            public Guid Id { get; set; }
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
                var subject = await _session.Query<Subject>()
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (subject == null)
                {
                    throw new Exception("Subject not found");
                }

                _session.Delete(subject);
                await _session.SaveChangesAsync();
                return new Response();
            }
        }
    }
}
