using System;
using System.Net;

namespace Exceptions.Models
{
    [Serializable]
    public class HttpsRequiredException : BaseException
    {
        public override HttpStatusCode StatusCode => HttpStatusCode.Forbidden;

        public HttpsRequiredException(string message) : base(message)
        {
        }

        public HttpsRequiredException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public HttpsRequiredException(Exception innerException) : base(innerException.Message, innerException)
        {
        }
    }
}