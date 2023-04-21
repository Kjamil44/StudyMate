using Marten;
using MediatR;
using StudyMate.API.Enums;

namespace StudyMate.API.Handlers.TaskHandlers
{
    public class UpdateTask
    {
        public class Request : IRequest<Response>
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
        public class Response
        {
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

                task.UpdateTask(request.Title, request.Description, request.DateCreated, request.DueDate, request.PriorityLevel, request.Status);
                _session.Store(task);
                await _session.SaveChangesAsync();
                return new Response();
            }
        }
    }
}
