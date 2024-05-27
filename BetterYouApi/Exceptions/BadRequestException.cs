using System;
using System.Net;

namespace Exceptions.Models
{
    [Serializable]
    public class BadRequestException : BaseException
    {
        public override HttpStatusCode StatusCode => HttpStatusCode.BadRequest;

        public BadRequestException(string message) : base(message)
        {
        }

        public BadRequestException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public BadRequestException(Exception innerException) : base(innerException.Message, innerException)
        {
        }

        public BadRequestException(string message, string errorReason) : base(message)
        {
            ErrorReason = errorReason;
        }

        public BadRequestException(string message, string errorReason, Exception innerException) :
            base(message, innerException)
        {
            ErrorReason = errorReason;
        }
    }
}