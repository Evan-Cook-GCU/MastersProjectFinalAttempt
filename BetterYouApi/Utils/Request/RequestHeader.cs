namespace Utils.Request
{
    public class RequestHeader
    {
        public const string Basic = "Basic";
        public const string Accept = "Accept";
        public const string Authorization = "Authorization";

        public const string Mock = "Content-Mock";
        public const string ApplicationName = "Content-Application-Name";
        public const string ClientTimeout = "Content-Client-Timeout";
        public const string UserId = "Content-User-Id";
        public const string UserIdScheme = "Content-User-Id-Scheme";
        public const string TrackingId = "Content-Tracking-Id";
        public const string ContentType = "Content-Type";
        public const string Roles = "Content-Roles";
        public const string AuthId = "Content-Auth-Id";
        public const string CsrfToken = "Content-Csrf-Token";
        public const string SkipCache = "Content-Skip-Cache";
        public const string SkipValidation = "Content-Skip-Validation";
        public const string CallbackUrl = "Content-Callback-Url";
        public const string AllHeadersMustStartWithContent = "Content-";

        public const string MqMessagingQueue = "Messaging-Queue";
        public const string MqMessagingResponseQueue = "Messaging-Response-Queue";
        public const string MqMessagingErrorQueue = "Messaging-Error-Queue";
        public const string MqMessagingProperties = "Messaging-Properties";
        public const string MqMessagingTopic = "Messaging-Topic";
        public const string MqMessagingPriority = "Messaging-Priority";
        public const string MqXCorrelationId = "Content-Mq-X-Correlation-Id";
        public const string MqXRequestId = "Content-Mq-X-Request-Id";
        public const string MqMessagingHeadersStartWithContent = "Messaging-";

        public const string LegacyMockHeadersStartWithContent = "Legacy-Mock-";
    }
}