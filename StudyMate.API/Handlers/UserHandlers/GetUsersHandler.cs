using StudyMate.API.Models;
using Marten;
using MediatR;

namespace StudyMate.API.Handlers.UserHandlers
{
    public class GetUsers
    {
        public class Request : IRequest<Response>
        {
        }
        public class Response
        {
            public class Item
            {
                public Guid UserId { get; set; }
                public string Name { get; set; }
                public string Surname { get; set; }
                public string Email { get; set; }
            }
            public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>();
        }
        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IDocumentSession _session;
            public Handler(IDocumentSession session) => _session = session;
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var users = await _session.Query<User>().ToListAsync();
                if (!users.Any())
                    throw new Exception("No Users available");

                return new Response
                {
                    Items = users.Select(user => new Response.Item
                    {
                        UserId = user.Id,
                        Name = user.Name,
                        Surname = user.Surname,
                        Email = user.Email
                    })
                };
            }
        }
    }
}
