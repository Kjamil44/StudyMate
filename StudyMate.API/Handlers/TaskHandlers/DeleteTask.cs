using Marten;
using MediatR;

namespace StudyMate.API.Handlers.TaskHandlers
{
    public class DeleteTask
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
                var task = await _session.Query<Models.Task>()
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (task == null)
                {
                    throw new Exception("Task not found");
                }

                _session.Delete(task);
                await _session.SaveChangesAsync();
                return new Response();
            }
        }
    }
}
