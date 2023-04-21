using Marten;
using MediatR;
using StudyMate.API.Enums;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.SubjectHandlers
{
    public class UpdateSubject
    {
        public class Request : IRequest<Response>
        {
            public Guid Id { get; set; }
            public string? Name { get; set; }
            public string? Description { get; set; }
            public int? Grade { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public Status? Status { get; set; }
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
                var subject = await _session.LoadAsync<Subject>(request.Id);
                if (subject == null)
                    throw new Exception("Subject not found");

                subject.UpdateSubject(request.Name, request.Description, request.Grade, request.StartDate, request.EndDate, request.Status);
                _session.Store(subject);
                await _session.SaveChangesAsync();

                return new Response();
            }
        }
    }
}
