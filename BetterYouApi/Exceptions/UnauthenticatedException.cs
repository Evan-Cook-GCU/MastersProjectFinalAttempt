using Exceptions.Models;
using System;
using System.Net;

namespace BetterYouApi
{
    [Serializable]
    public class UnauthenticatedException : BaseException
    {
        public override HttpStatusCode StatusCode => HttpStatusCode.Unauthorized;

        public UnauthenticatedException(string message) : base(message)
        {
        }

        public UnauthenticatedException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public UnauthenticatedException(Exception innerException) : base(innerException.Message, innerException)
        {
        }

        public UnauthenticatedException(string message, string errorReason) : base(message)
        {
            ErrorReason = errorReason;
        }

        public UnauthenticatedException(string message, string errorReason, Exception innerException) :
            base(message, innerException)
        {
            ErrorReason = errorReason;
        }
    }
}