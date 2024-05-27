using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using BetterYouApi.Attributes;
using BetterYouApi;

namespace BetterYouApi.Filters
{
    public class ApiAuthorizeFilter : IActionFilter
    {
        public bool AllowMultiple => true;
        private readonly IEnvironmentService _environmentService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ApiAuthorizeFilter"/> class.
        /// </summary>
        /// <param name="environmentService">The environment service.</param>
        public ApiAuthorizeFilter(IEnvironmentService environmentService)
        {
            _environmentService = environmentService;
        }

        public Task<HttpResponseMessage> ExecuteActionFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            AuthorizeByEnvironmentAttribute authAttribute = actionContext.ActionDescriptor.GetCustomAttributes<AuthorizeByEnvironmentAttribute>().SingleOrDefault();

            if (authAttribute == null)
            {
                return continuation();
            }

            System.Security.Principal.IPrincipal principal = actionContext.RequestContext.Principal;
            bool authorized;
            if (_environmentService.Production())
            {
                authorized = principal.IsInRole(authAttribute.ProductionRoles);
            }
            else
            {
                authorized = principal.IsInRole(authAttribute.NonProductionRoles);
            }

            if (!authorized)
            {
                if (!actionContext.RequestContext.Principal.Identity.IsAuthenticated)
                {
                    throw new UnauthenticatedException("User and/or password is not valid");
                }

                throw new UnauthenticatedException("User does not have sufficient access");
            }

            return continuation().ContinueWith(t => t.Result, cancellationToken);
        }
    }
}