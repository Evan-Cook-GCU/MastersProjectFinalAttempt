using Common.Logging;
using Microsoft.Owin;
using System;
using System.Reflection;
using System.Threading.Tasks;
using Utils.Response;

namespace BetterYouApi
{
    /// <summary>
    /// 
    /// </summary>
    public class TrackingIdMiddleware : OwinMiddleware
    {
        private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        private readonly ILog _log; // to facilitate mocking by TrackingIdMiddlewareTest
        /// <summary>
        /// 
        /// </summary>
        /// <param name="next"></param>
        public TrackingIdMiddleware(OwinMiddleware next) : base(next)
        {
            if (next == null)
            {
                throw new ArgumentNullException(nameof(next));
            }
            _log = Log;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="next"></param>
        /// <param name="log"></param>
        public TrackingIdMiddleware(OwinMiddleware next, ILog log) : this(next)
        {
            _log = log;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override async Task Invoke(IOwinContext context)
        {
            var trackingId = context.Environment["App.TrackingId"] as string;
            var requestId = context.Environment["App.RequestId"] as string;

            var response = context.Response;
            response.OnSendingHeaders(state =>
            {
                var r = (OwinResponse)state;
                if (!r.Headers.ContainsKey(ResponseHeader.TrackingId))
                {
                    r.Headers.Add(ResponseHeader.TrackingId, new[] { trackingId });
                }
                if (!r.Headers.ContainsKey(ResponseHeader.RequestId))
                {
                    r.Headers.Add(ResponseHeader.RequestId, new[] { requestId });
                }
            }, response);

            try
            {
                await Next.Invoke(context);
            }
            catch (Exception e)
            {
                _log.Error("Unhandled Exception: ", e);
                throw;
            }
        }
    }
}
