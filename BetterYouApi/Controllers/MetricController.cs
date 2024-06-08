using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/metrics")]
    public class MetricController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(context.Metrics.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var metric = context.Metrics.FirstOrDefault(m => m.MetricId == id);
            if (metric == null)
            {
                return NotFound();
            }
            return Ok(metric);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(Metric metric)
        {
            context.Metrics.Add(metric);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + metric.MetricId), metric);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, Metric metric)
        {
            var existingMetric = context.Metrics.FirstOrDefault(m => m.MetricId == id);
            if (existingMetric == null)
            {
                return NotFound();
            }
            existingMetric.MetricName = metric.MetricName;
            existingMetric.MetricType = metric.MetricType;
            existingMetric.Description = metric.Description;
            context.SaveChanges();
            return Ok(existingMetric);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var metric = context.Metrics.FirstOrDefault(m => m.MetricId == id);
            if (metric == null)
            {
                return NotFound();
            }
            context.Metrics.Remove(metric);
            context.SaveChanges();
            return Ok();
        }
    }
}
