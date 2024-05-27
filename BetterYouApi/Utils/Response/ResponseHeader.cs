namespace Utils.Response
{
    public class ResponseHeader
    {
        public const string Allow = "Allow";
        public const string Location = "Location";
        public const string ContentType = "Content-Type";

        public const string CustomHeadersMustStartWithX = "X-";
        public const string Id = "X-Id";
        public const string RelatedElements = "X-Related-Elements";
        public const string StatusCode = "X-Status-Code";
        public const string StatusReason = "X-Status-Reason";
        public const string StatusDescription = "X-Status-Description";
        public const string TrackingId = "X-Tracking-Id";
        public const string RequestId = "X-Request-Id";
        public const string DocumentationUri = "X-Uri-Documentation";

        public const string MqCorrelationId = "X-Correlation-Id";
        public const string MqMessageId = "X-Message-Id";
    }
}