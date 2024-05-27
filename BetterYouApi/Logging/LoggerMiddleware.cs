using Common.Logging;
using Microsoft.Owin;
using NLog;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Utils.Request;
using LogManager = Common.Logging.LogManager;

namespace BetterYouApi.Logging
{
    /// <summary>
    /// 
    /// </summary>
    public class LoggerMiddleware : OwinMiddleware
    {
        /// <summary>
        /// 
        /// </summary>
        public const string AppRequestId = "App.RequestId";
        /// <summary>
        /// 
        /// </summary>
        public const string AppServerIpAndPort = "App.ServerIpAndPort";
        /// <summary>
        /// 
        /// </summary>
        public const string AppTrackingId = "App.TrackingId";
        /// <summary>
        /// 
        /// </summary>
        public const string AppRequestPath = "App.RequestPath";
        /// <summary>
        /// 
        /// </summary>
        public const string AppRequestMethod = "App.RequestMethod";

        private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        private readonly ILog _log; // to facilitate mocking by LoggerMiddlewareTest

        private readonly RequestJsonWriter _requestJsonWriter;
        private readonly ResponseJsonWriter _responseJsonWriter;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="next"></param>
        public LoggerMiddleware(OwinMiddleware next) : base(next)
        {
            if (next == null)
            {
                throw new ArgumentNullException(nameof(next));
            }

            _log = Log;

            var env = new EnvironmentService().Environment();
            bool prettyPrintJson = EnvironmentService.LocalDevEnvironmentName == env ||
                                   EnvironmentService.DevEnvironmentName == env;

            _requestJsonWriter = new RequestJsonWriter(prettyPrintJson);
            _responseJsonWriter = new ResponseJsonWriter(prettyPrintJson);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="next"></param>
        /// <param name="log"></param>
        public LoggerMiddleware(OwinMiddleware next, ILog log) : this(next)
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
            try
            {
                var startTime = DateTime.Now;
                var requestId = GenerateRequestId();

                string trackingId;
                if (!TryGetTrackingId(context.Environment, out trackingId))
                {
                    trackingId = requestId;
                }

                context.Environment[AppRequestId] = requestId; // Make the RequestId available to WebApi2 controllers.
                context.Environment[AppTrackingId] = trackingId; // Make the TrackingId available to WebApi2 controllers. 

                // Values set on the MDLC are available in the logger config file layout
                MappedDiagnosticsLogicalContext.Set(AppRequestId, requestId);
                MappedDiagnosticsLogicalContext.Set(AppServerIpAndPort, GetServerIpAndPort(context.Environment));
                MappedDiagnosticsLogicalContext.Set(AppRequestMethod, GetStringProperty(context.Environment, "owin.RequestMethod"));
                MappedDiagnosticsLogicalContext.Set(AppRequestPath, GetStringProperty(context.Environment, "owin.RequestPath"));
                MappedDiagnosticsLogicalContext.Set(AppTrackingId, trackingId);

                _log.Info("START: Request=" + _requestJsonWriter.CreateRequestJson(context.Environment));

                try
                {
                    await Next.Invoke(context);
                }
                catch (Exception e)
                {
                    _log.Error("Unhandled Exception: ", e);
                    throw;
                }
                finally
                {
                    _log.Info(
                        $"END: Duration={DateTime.Now.Subtract(startTime).TotalSeconds} seconds, Response Headers="
                        + _responseJsonWriter.CreateResponseJson(context.Environment));
                }
            }
            finally
            {
                MappedDiagnosticsLogicalContext.Remove(AppRequestId);
                MappedDiagnosticsLogicalContext.Remove(AppTrackingId);
                MappedDiagnosticsLogicalContext.Remove(AppServerIpAndPort);
                MappedDiagnosticsLogicalContext.Remove(AppRequestMethod);
                MappedDiagnosticsLogicalContext.Remove(AppRequestPath);
            }
        }

        private string GetStringProperty(IDictionary<string, object> environment, string propertyName)
        {
            if (!environment.ContainsKey(propertyName))
            {
                return "";
            }
            var value = environment[propertyName] as string;
            return value;
        }

        /**
         * Generates a Request ID by combining the current timestamp with a new GUID.
         **/
        private string GenerateRequestId()
        {

            return DateTime.Now.ToString("yyyy-MM-dd_HH:mm:ss.ffff") + "_" + System.Guid.NewGuid();
        }

        /**
         * Tries to get the Tracking ID from the HTTP Request Header. Returns true if successful, otherwise assigns null to trackingId.
         **/
        private bool TryGetTrackingId(IDictionary<string, object> environment, out string trackingId)
        {
            var headersDictionary = environment.ContainsKey("owin.RequestHeaders") ?
                environment["owin.RequestHeaders"] as IDictionary<string, string[]> : null;
            if (headersDictionary != null && headersDictionary.ContainsKey(RequestHeader.TrackingId))
            {
                var values = headersDictionary[RequestHeader.TrackingId];
                if (values.Length > 0)
                {
                    trackingId = values[0];
                    return true;
                }
            }
            trackingId = null;
            return false;
        }

        private string GetServerIpAndPort(IDictionary<string, object> environment)
        {
            string ip = environment.ContainsKey("server.LocalIpAddress")
                ? environment["server.LocalIpAddress"].ToString()
                : "unknown";

            if (ip.Contains(":")) // if it's IPv6 with colons, add brackets to distinguish port number
            {
                ip = $"[{ip}]";
            }

            if (environment.ContainsKey("server.LocalPort"))
            {
                ip += ":" + environment["server.LocalPort"];
            }

            return ip;
        }

    }
}