using Marten;
using MediatR;
using StudyMate.API.Enums;
using StudyMate.API.Models;

namespace StudyMate.API.Handlers.NoteHandlers
{
    public class UpdateNote
    {
        public class Request : IRequest<Response>
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
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
                var note = await _session.LoadAsync<Note>(request.Id);
                if (note == null)
                    throw new Exception("Note not found");

                note.UpdateNote(request.Title, request.Description);
                _session.Store(note);
                await _session.SaveChangesAsync();

                return new Response();
            }
        }
    }
}
