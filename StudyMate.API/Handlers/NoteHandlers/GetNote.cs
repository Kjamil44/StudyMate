using Marten;
using MediatR;
using StudyMate.API.Helper;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.NoteHandlers
{
    public class GetNote
    {
        public class Request : IRequest<Response>
        {
            public Guid Id { get; set; }
        }
        public class Response
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public Guid BelongsId { get; set; }
            public string BelongsModel { get; set; }
        }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            public Handler(IDocumentSession session) => _session = session;
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var note = await _session.LoadAsync<Note>(request.Id);
                if (note == null)
                    throw new Exception("Note not found");

                var belongsTo = await HelperClass.FindCreator(_session, note.BelongsId);
                if (!belongsTo)
                    throw new Exception("The creator of the Note does not exist.");

                return new Response
                {
                    Id = note.Id,
                    Title = note.Title,
                    Description = note.Description,
                    BelongsId = note.BelongsId,
                    BelongsModel = note.BelongsModel
                };
            }
        }
    }
}
