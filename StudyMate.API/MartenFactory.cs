using Marten;

namespace StudyMate.API
{
    public static class MartenFactory
    {
        public static IDocumentSession Session { get; set; }    
        public static IDocumentStore CreateDocumentStore()
        {
            var store = DocumentStore.For("User ID=postgres;Password=1234;Host=localhost;Port=6969;Database=StudyMateDb;");
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
