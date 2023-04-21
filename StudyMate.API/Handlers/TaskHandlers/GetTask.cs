using Marten;
using MediatR;
using StudyMate.API.Enums;

namespace StudyMate.API.Handlers.TaskHandlers
{
    public class GetTask
    {
        public class Request : IRequest<Response>
        {
            public Guid Id { get; set; }
        }
        public class Response
        {
            public Guid Id { get; set; }
            public Guid SubjectId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public DateTime DateCreated { get; set; }
            public DateTime DueDate { get; set; }
            public PriorityLevel PriorityLevel { get; set; }
            public Status Status { get; set; }
        }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            public Handler(IDocumentSession session) => _session = session;
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var task = await _session.LoadAsync<Models.Task>(request.Id);
                if (task == null)
                    throw new Exception("Task not found");

                return new Response
                {
                    Id = task.Id,
                    SubjectId = task.SubjectId,
                    Title = task.Title,
                    Description = task.Description,
                    DateCreated = task.DateCreated,
                    DueDate = task.DueDate,
                    PriorityLevel = task.PriorityLevel,
                    Status = task.Status,
                };
            }
        }
    }
}
