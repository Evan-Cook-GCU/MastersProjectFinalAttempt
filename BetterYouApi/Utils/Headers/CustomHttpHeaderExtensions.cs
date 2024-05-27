using System.Linq;
using System.Net.Http.Headers;
using Utils.Request;
using Utils.Response;

namespace Utils.Header
{
    public static class CustomHttpHeaderExtensions
    {
        public static string GetXId(this HttpResponseHeaders responseHeaders)
        {
            return GetHeaderValue(responseHeaders, ResponseHeader.Id);
        }

        public static void SetXId(this HttpResponseHeaders responseHeaders, string value)
        {
            SetHeaderValue(responseHeaders, ResponseHeader.Id, value);
        }

        public static string GetXStatusDescription(this HttpResponseHeaders responseHeaders)
        {
            return GetHeaderValue(responseHeaders, ResponseHeader.StatusDescription);
        }

        public static void SetXStatusDescription(this HttpResponseHeaders responseHeaders, string value)
        {
            SetHeaderValue(responseHeaders, ResponseHeader.StatusDescription, value);
        }

        public static string GetXStatusCode(this HttpResponseHeaders responseHeaders)
        {
            return GetHeaderValue(responseHeaders, ResponseHeader.StatusCode);
        }

        public static void SetXStatusCode(this HttpResponseHeaders responseHeaders, string value)
        {
            SetHeaderValue(responseHeaders, ResponseHeader.StatusCode, value);
        }

        public static string GetXStatusReason(this HttpResponseHeaders responseHeaders)
        {
            return GetHeaderValue(responseHeaders, ResponseHeader.StatusReason);
        }

        public static void SetXStatusReason(this HttpResponseHeaders responseHeaders, string value)
        {
            SetHeaderValue(responseHeaders, ResponseHeader.StatusReason, value);
        }

        public static string GetXRelatedElements(this HttpResponseHeaders responseHeaders)
        {
            return GetHeaderValue(responseHeaders, ResponseHeader.RelatedElements);
        }

        public static void SetXRelatedElements(this HttpResponseHeaders responseHeaders, string value)
        {
            SetHeaderValue(responseHeaders, ResponseHeader.RelatedElements, value);
        }

        public static string GetXRequestId(this HttpResponseHeaders responseHeaders)
        {
            return GetHeaderValue(responseHeaders, ResponseHeader.RequestId);
        }

        public static void SetXRequestId(this HttpResponseHeaders responseHeaders, string value)
        {
            SetHeaderValue(responseHeaders, ResponseHeader.RequestId, value);
        }

        public static string GetXTrackingId(this HttpResponseHeaders responseHeaders)
        {
            return GetHeaderValue(responseHeaders, ResponseHeader.TrackingId);
        }

        public static void SetXTrackingId(this HttpResponseHeaders responseHeaders, string value)
        {
            SetHeaderValue(responseHeaders, ResponseHeader.TrackingId, value);
        }

        public static string GetTrackingId(this HttpRequestHeaders requestHeaders)
        {
            return GetHeaderValue(requestHeaders, RequestHeader.TrackingId);
        }

        public static void SetTrackingId(this HttpRequestHeaders requestHeaders, string value)
        {
            SetHeaderValue(requestHeaders, RequestHeader.TrackingId, value);
        }

        public static string GetApplicationName(this HttpRequestHeaders requestHeaders)
        {
            return GetHeaderValue(requestHeaders, RequestHeader.ApplicationName);
        }

        public static void SetApplicationName(this HttpRequestHeaders requestHeaders, string value)
        {
            SetHeaderValue(requestHeaders, RequestHeader.ApplicationName, value);
        }

        public static string GetClientTimeout(this HttpRequestHeaders requestHeaders)
        {
            return GetHeaderValue(requestHeaders, RequestHeader.ClientTimeout);
        }

        public static void SetClientTimeout(this HttpRequestHeaders requestHeaders, string value)
        {
            SetHeaderValue(requestHeaders, RequestHeader.ClientTimeout, value);
        }

        public static string GetUserId(this HttpRequestHeaders requestHeaders)
        {
            return GetHeaderValue(requestHeaders, RequestHeader.UserId);
        }

        public static void SetUserId(this HttpRequestHeaders requestHeaders, string value)
        {
            SetHeaderValue(requestHeaders, RequestHeader.UserId, value);
        }

        public static string GetUserIdScheme(this HttpRequestHeaders requestHeaders)
        {
            return GetHeaderValue(requestHeaders, RequestHeader.UserIdScheme);
        }

        public static void SetUserIdScheme(this HttpRequestHeaders requestHeaders, string value)
        {
            SetHeaderValue(requestHeaders, RequestHeader.UserIdScheme, value);
        }

        public static string GetAuthId(this HttpRequestHeaders requestHeaders)
        {
            return GetHeaderValue(requestHeaders, RequestHeader.AuthId);
        }

        public static void SetAuthId(this HttpRequestHeaders requestHeaders, string value)
        {
            SetHeaderValue(requestHeaders, RequestHeader.AuthId, value);
        }

        public static string GetCallbackUrl(this HttpRequestHeaders requestHeaders)
        {
            return GetHeaderValue(requestHeaders, RequestHeader.CallbackUrl);
        }

        public static void SetCallbackUrl(this HttpRequestHeaders requestHeaders, string value)
        {
            SetHeaderValue(requestHeaders, RequestHeader.CallbackUrl, value);
        }

        public static string GetDocumentationUri(this HttpResponseHeaders responseHeaders)
        {
            return GetHeaderValue(responseHeaders, ResponseHeader.DocumentationUri);
        }

        public static void SetDocumentationUri(this HttpResponseHeaders responseHeaders, string value)
        {
            SetHeaderValue(responseHeaders, ResponseHeader.DocumentationUri, value);
        }

        private static string GetHeaderValue(HttpHeaders responseHeaders, string headerKey)
        {
            var kvp = responseHeaders.FirstOrDefault(h => headerKey.Equals(h.Key));
            return kvp.Value?.FirstOrDefault();
        }

        private static void SetHeaderValue(HttpHeaders responseHeaders, string headerKey, string value)
        {
            responseHeaders.Remove(headerKey);
            responseHeaders.Add(headerKey, value);
        }
    }
}