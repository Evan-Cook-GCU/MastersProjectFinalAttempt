using Exceptions.Models;
using Newtonsoft.Json;
using System.Linq;
using System.Runtime.Serialization;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace BetterYouApi.Filters
{
    /// <summary>
    ///     This Filter will check the ModelState to determine the model was successfully deserialized.
    /// </summary>
    /// <exception cref="BadRequestException">
    ///     This is thrown if errors are present indicating the registered MediaTypeFormatter for this Content-Type
    ///     failed to deserialize the model.
    /// </exception>
    public class ModelContentFilter : ActionFilterAttribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="actionContext"></param>
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.ModelState.IsValid)
            {
                foreach (var state in actionContext.ModelState)
                    if (state.Value != null && state.Value.Errors != null &&
                        state.Value.Errors.Any(o =>
                            o.Exception is JsonReaderException || o.Exception is SerializationException))
                    {
                        throw new BadRequestException("The request is not formatted in given content-type");
                    }
            }
        }
    }
}