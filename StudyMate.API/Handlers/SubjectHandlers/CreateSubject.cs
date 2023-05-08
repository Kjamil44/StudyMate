using Marten;
using MediatR;
using StudyMate.API.Enums;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.SubjectHandlers
{
    public class CreateSubject
    {
        public class Request : IRequest<Response>
        {
            public Guid UserId { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public int Grade { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public Status Status { get; set; }
        }

        public class Response
        {
            public Guid UserId { get; set;}
            public Guid SubjectId { get; set; }
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
                var user = await _session.Query<User>().FirstOrDefaultAsync(x => x.Id == request.UserId);
                if (user == null)
                    throw new Exception("The subject cannot be created because the user does not exist.");

                var subject = new Subject(request.UserId, request.Name, request.Description, request.Grade, request.StartDate, request.EndDate, request.Status);

                _session.Store(subject);
                await _session.SaveChangesAsync();

                return new Response
                {
                    UserId = user.Id,
                    SubjectId = subject.Id,
                };
            }
        }
    }
}
