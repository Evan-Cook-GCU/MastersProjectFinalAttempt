using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;
using BetterYouApi.Mappings;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/fields")]
    public class FieldController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("metric/{metricId:int}")]
        public IHttpActionResult GetFieldsByMetricId(int metricId)
        {
            var fields = context.Fields.Where(f => f.MetricId == metricId);
            if (!fields.Any())
            {
                return NotFound();
            }
            var fieldDtos = fields.Select(MappingProfile.ToDTO).ToList();
            return Ok(fieldDtos);
        }
    }
}
