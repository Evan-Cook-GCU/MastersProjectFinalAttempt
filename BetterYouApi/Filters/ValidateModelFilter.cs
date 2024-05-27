using Exceptions.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace BetterYouApi.Filters
{
    /// <summary>
    /// 
    /// </summary>
    public class ValidateModelFilter : ActionFilterAttribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="actionContext"></param>
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ModelState.IsValid == false)
            {
                var keys = new List<string>();
                foreach (var keyValuePair in actionContext.ModelState.Keys)
                {
                    if (actionContext.ModelState[keyValuePair].Errors != null &&
                        actionContext.ModelState[keyValuePair].Errors.Count > 0)
                    {
                        keys.Add(keyValuePair);
                    }
                }

                var exception = new BadRequestException("The request is invalid");

                exception.RelatedElements =
                    keys.Aggregate((current, next) => $"{current}, {next}");
                exception.ErrorReason = actionContext.ModelState.Values.SelectMany(m => m.Errors)
                    .GroupBy(c => c.ErrorMessage).Select(d => d.Key)
                    .Aggregate((current, next) => $"{current}, {next}");

                throw exception;
            }
        }
    }
}