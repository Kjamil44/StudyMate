using Marten;
using MediatR;
using StudyMate.API.Enums;

namespace StudyMate.API.Handlers.TaskHandlers
{
    public class GetTasks
    {
        public class Request : IRequest<Response>
        {
        }
        public class Response
        {
            public class Item
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
            public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();
        }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            public Handler(IDocumentSession session) => _session = session;
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var tasks = await _session.Query<Models.Task>().ToListAsync();
                if (!tasks.Any())
                    throw new Exception("No Tasks available");

                return new Response
                {
                    Items = tasks.Select(task => new Response.Item
                    {
                        Id = task.Id,
                        SubjectId = task.SubjectId,
                        Title = task.Title,
                        Description = task.Description,
                        DateCreated = task.DateCreated,
                        DueDate = task.DueDate,
                        PriorityLevel = task.PriorityLevel,
                        Status = task.Status,
                    })
                };
            }
        }
    }
}
