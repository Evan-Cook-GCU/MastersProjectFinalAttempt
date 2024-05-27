using System;
using System.Net;
using System.Runtime.Serialization;

namespace Exceptions.Models
{
    [Serializable]
    public abstract class BaseException : Exception
    {
        public virtual HttpStatusCode StatusCode => HttpStatusCode.InternalServerError;

        protected BaseException(string message) : base(message)
        {
        }

        protected BaseException(string message, Exception innerException) : base(message, innerException)
        {
            ConsumeException(innerException);
        }

        protected BaseException(Exception innerException) : base(innerException.Message, innerException)
        {
            ConsumeException(innerException);
        }

        private void ConsumeException(Exception innerException)
        {
            var exception = innerException as BaseException;
            if (exception != null)
            {
                ErrorCode = exception.ErrorCode;
                ErrorReason = exception.ErrorReason;
                RelatedElements = exception.RelatedElements;
            }
        }

        public string ErrorCode { get; set; }

        public string ErrorReason { get; set; }

        public string RelatedElements { get; set; }

        public override void GetObjectData(SerializationInfo oInfo, StreamingContext oContext)
        {
            base.GetObjectData(oInfo, oContext);
            oInfo.AddValue("ErrorCode", ErrorCode);
            oInfo.AddValue("ErrorReason", ErrorReason);
            oInfo.AddValue("RelatedElements", RelatedElements);
        }
    }
}
