using Autofac.Integration.WebApi;
using Common.Logging;
using Exceptions.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;

namespace BetterYouApi.Filters
{
    /// <summary>
    /// 
    /// </summary>
    public class ExceptionHandlerFilter : IAutofacExceptionFilter
    {
        private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="actionExecutedContext"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task OnExceptionAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            if (actionExecutedContext.Exception != null)
            {
                return HandleException(actionExecutedContext, cancellationToken);
            }

            return Task.FromResult(0);
        }

        private string GetErrorReason(BaseException forestryBaseException)
        {
            return !string.IsNullOrWhiteSpace(forestryBaseException.ErrorReason)
                ? CleanHeaderValues(forestryBaseException.ErrorReason)
                : GetInnerExceptionMessage(forestryBaseException);
        }

        private string GetInnerExceptionMessage(Exception e)
        {
            while (e.InnerException != null) e = e.InnerException;
            return CleanHeaderValues(e.Message);
        }

        private static string CleanHeaderValues(string headerValue)
        {
            return string.IsNullOrEmpty(headerValue) ? headerValue : headerValue.Replace("\n", " ");
        }

        private async Task HandleException(HttpActionExecutedContext context, CancellationToken cancellationToken)
        {
            var error = context.Exception;
            Log.Error(error);

            var httpStatusCode = HttpStatusCode.InternalServerError;
            var statusReason = GetInnerExceptionMessage(error);
            var statusCode = "";
            var statusDescription = "";
            var relatedElements = "";

            if (error is BaseException)
            {
                var baseException = error as BaseException;
                httpStatusCode = baseException.StatusCode;
                statusReason = GetErrorReason(baseException);
                statusCode = CleanHeaderValues(baseException.ErrorCode);
                relatedElements = CleanHeaderValues(baseException.RelatedElements);
                statusDescription = baseException.Message;
            }

            var errorResult = new ErrorResult
            {
                StatusCode = statusCode,
                StatusReason = statusReason,
                HttpStatusCode = httpStatusCode,
                RelatedElements = relatedElements,
                StatusDescription = statusDescription
            };

            context.Response = await errorResult.ExecuteAsync(cancellationToken);

            Log.Error($"HTTP {httpStatusCode}: Description=[{statusDescription}] " +
                      $"Reason=[{statusReason}] ErrorCode=[{statusCode}] RelatedElements=[{relatedElements}]");
        }

        internal class ErrorResult : IHttpActionResult
        {
            public string StatusCode { get; set; }

            public string StatusDescription { get; set; }

            public string StatusReason { get; set; }

            public HttpStatusCode HttpStatusCode { get; set; }

            public string RelatedElements { get; set; }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                var response = new HttpResponseMessage(HttpStatusCode);
                if (response.Content == null)
                {
                    response.Content = new StringContent("");
                }
                if (!string.IsNullOrWhiteSpace(StatusCode))
                {
                    response.Headers.Add("X-Status-Code", StatusCode);
                }
                if (!string.IsNullOrWhiteSpace(StatusDescription))
                {
                    response.Headers.Add("X-Status-Description", StatusDescription);
                }
                if (!string.IsNullOrWhiteSpace(StatusReason))
                {
                    response.Headers.Add("X-Status-Reason", StatusReason);
                }
                if (!string.IsNullOrWhiteSpace(RelatedElements))
                {
                    response.Headers.Add("X-Related-Elements", RelatedElements);
                }
            
                return Task.FromResult(response);
            }
        }
    }
}