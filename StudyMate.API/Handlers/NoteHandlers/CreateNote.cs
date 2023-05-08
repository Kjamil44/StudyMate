using Marten;
using MediatR;
using StudyMate.API.Models;
using StudyMate.API.Helper;

namespace StudyMate.API.Handlers.NoteHandlers
{
    public class CreateNote
    {
        public class Request : IRequest<Response>
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public Guid BelongsId { get; set; }
            public string BelongsName { get; set; } 
        }

        public class Response
        {
            public Guid BelongsId { get; set; }
            public string BelongsName { get; set; }
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
                var creatorExists = await HelperClass.FindCreator(_session, request.BelongsId);
                if(!creatorExists)    
                    throw new Exception("Cannot create a Note.");

                var note = new Note(request.Title, request.Description, request.BelongsId, request.BelongsName);

                _session.Store(note);
                await _session.SaveChangesAsync();

                return new Response
                {
                    BelongsId = request.BelongsId,
                    BelongsName = request.BelongsName
                };
            }
        }
    }
}
