using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/metrics")]
    public class MetricController : ApiController
    {
        private static List<Metric> metrics = new List<Metric>();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(metrics);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var metric = metrics.FirstOrDefault(m => m.MetricId == id);
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
            metric.MetricId = metrics.Count + 1;
            metrics.Add(metric);
            return Created(new Uri(Request.RequestUri + "/" + metric.MetricId), metric);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, Metric metric)
        {
            var existingMetric = metrics.FirstOrDefault(m => m.MetricId == id);
            if (existingMetric == null)
            {
                return NotFound();
            }
            existingMetric.MetricName = metric.MetricName;
            existingMetric.MetricType = metric.MetricType;
            existingMetric.Description = metric.Description;
            return Ok(existingMetric);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var metric = metrics.FirstOrDefault(m => m.MetricId == id);
            if (metric == null)
            {
                return NotFound();
            }
            metrics.Remove(metric);
            return Ok();
        }
    }
}
