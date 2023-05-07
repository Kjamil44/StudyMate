using Marten;
using MediatR;
using StudyMate.API.Enums;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.TaskHandlers
{
    public class CreateTask
    {
        public class Request : IRequest<Response>
        {
            public Guid SubjectId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime DueDate { get; set; }
            public PriorityLevel PriorityLevel { get; set; }
        }

        public class Response
        {
            public Guid SubjectId { get; set; }
            public Guid TaskId { get; set; }
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
                var task = new Models.Task
                (
                    request.SubjectId,
                    request.Title,
                    request.Description,
                    DateTime.UtcNow,
                    request.DueDate,
                    request.PriorityLevel,
                    Status.TODO
                );

                _session.Store(task);
                await _session.SaveChangesAsync();

                return new Response
                {
                    SubjectId = request.SubjectId,
                    TaskId = task.Id
                };
            }
        }
    }
}
