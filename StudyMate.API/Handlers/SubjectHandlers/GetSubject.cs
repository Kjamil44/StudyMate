using Marten;
using MediatR;
using StudyMate.API.Enums;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.SubjectHandlers
{
    public class GetSubject
    {
        public class Request : IRequest<Response>
        {
            public Guid Id { get; set; }
        }
        public class Response
        {
            public Guid Id { get; set; }
            public Guid UserId { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public int Grade { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public Status Status { get; set; }
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

                return new Response
                {
                    Id = subject.Id,
                    UserId = subject.UserId,
                    Name = subject.Name, 
                    Description = subject.Description,
                    Grade = subject.Grade,
                    StartDate = subject.StartDate,
                    EndDate = subject.EndDate,
                    Status = subject.Status
                };
            }
        }
    }
}
