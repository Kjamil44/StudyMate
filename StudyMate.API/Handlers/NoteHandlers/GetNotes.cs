using Marten;
using MediatR;
using StudyMate.API.Helper;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.NoteHandlers
{
    public class GetNotes
    {
        public class Request : IRequest<Response>
        {
        }
        public class Response
        {
            public class Item
            {
                public Guid Id { get; set; }
                public string Title { get; set; }
                public string Description { get; set; }
                public Guid BelongsId { get; set; }
                public string BelongsModel { get; set; }
            }
            public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();
        }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            public Handler(IDocumentSession session) => _session = session;
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var notes = await _session.Query<Note>().ToListAsync();
                if (!notes.Any())
                    throw new Exception("No Notes available");

                return new Response
                {
                    Items = notes.Select(note => new Response.Item
                    {
                        Id = note.Id,
                        Title = note.Title,
                        Description = note.Description,
                        BelongsId = note.BelongsId,
                        BelongsModel = note.BelongsModel
                    })
                };
            }
        }
    }
}
