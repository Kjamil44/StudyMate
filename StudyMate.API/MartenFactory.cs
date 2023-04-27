using Microsoft.Extensions.Configuration;
using Marten;

namespace StudyMate.API
{
    public static class MartenFactory
    {

        public static IDocumentSession Session { get; set; }    
        public static IDocumentStore CreateDocumentStore()
        {
            var config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json").Build();
            var store = DocumentStore.For(config.GetSection("ConnectionString").Value);
            return store;
        }
        public static IDocumentSession CreateDocumentSession()
        {
            var store = CreateDocumentStore();
            var docTracking = DocumentTracking.IdentityOnly;

            return store.OpenSession(docTracking);
        }
    }
}
