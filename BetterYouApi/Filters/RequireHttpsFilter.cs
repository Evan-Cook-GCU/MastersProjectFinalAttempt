using Autofac.Integration.WebApi;
using Exceptions.Models;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;

namespace BetterYouApi.Filters
{
    /// <inheritdoc />
    /// <summary>
    ///     This filter requires HTTPs for all requests except those that allow anonymous access.
    ///     An alternative is to configured IIS to always require SSL, such as with:
    ///     <access sslFlags="Ssl, SslNegotiateCert" /> in the applicationhost.config
    /// </summary>
    public class RequireHttpsFilter : IAutofacAuthenticationFilter
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var allowAccess = context.ActionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>();
            if (allowAccess != null && allowAccess.Count > 0)
            {
                return Task.FromResult(0);
            }

            if (new EnvironmentService().LocalDev())
            {
                return Task.FromResult(0);
            }

            if (context.Request.RequestUri.Scheme != Uri.UriSchemeHttps)
            {
                throw new HttpsRequiredException("HTTPS is required.");
            }
            return Task.FromResult(0);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}
