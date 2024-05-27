using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace BetterYouApi.Attributes
{
    /// <summary>
    /// 
    /// </summary>
    public class ApiAuthorizeAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ctx"></param>
        protected override void HandleUnauthorizedRequest(HttpActionContext ctx)
        {
            if (!ctx.RequestContext.Principal.Identity.IsAuthenticated)
                base.HandleUnauthorizedRequest(ctx);
            else
            {
                // Authenticated, but not AUTHORIZED.  Return 403 instead!
                ctx.Response = new HttpResponseMessage(HttpStatusCode.Forbidden);
            }
        }
    }
}