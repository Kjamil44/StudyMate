using Marten;
using MediatR;
using StudyMate.API.Enums;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.SubjectHandlers
{
    public class GetSubjects
    {
        public class Request : IRequest<Response>
        {
            public Guid UserId { get; set; }
        }
        public class Response
        {
            public class Item
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
            public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();
        }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            public Handler(IDocumentSession session) => _session = session;
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var subjects = await _session.Query<Subject>().Where(subject => subject.UserId.Equals(request.UserId)).ToListAsync();
                if (!subjects.Any())
                    throw new Exception("No Subjects available");

                return new Response
                {
                    Items = subjects.Select(subject => new Response.Item
                    {
                        Id = subject.Id,
                        UserId = subject.UserId,
                        Name = subject.Name,
                        Description = subject.Description,
                        Grade = subject.Grade,
                        StartDate = subject.StartDate,
                        EndDate = subject.EndDate,
                        Status = subject.Status
                    })
                };
            }
        }
    }
}
