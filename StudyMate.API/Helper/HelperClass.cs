using Marten;
using StudyMate.API.Models;

namespace StudyMate.API.Helper
{
    public class HelperClass
    {
        public static async Task<bool> FindCreator(IDocumentSession _session, Guid belongsId)
        {
            var user = await _session.Query<User>().FirstOrDefaultAsync(x => x.Id == belongsId);
            if (user != null)
                return true;

            var subject = await _session.Query<Subject>().FirstOrDefaultAsync(x => x.Id == belongsId);
            if (subject != null)
                return true;

            var task = await _session.Query<Models.Task>().FirstOrDefaultAsync(x => x.Id == belongsId);
            if (task != null)
                return true;

            return false;
        }
    }
}
