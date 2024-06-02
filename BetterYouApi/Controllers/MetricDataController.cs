using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/metricdata")]
    public class MetricDataController : ApiController
    {
        private static List<MetricData> metricData = new List<MetricData>();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(metricData);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var data = metricData.FirstOrDefault(md => md.MetricDataId == id);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(MetricData data)
        {
            data.MetricDataId = metricData.Count + 1;
            data.DataDate = DateTime.Now;
            metricData.Add(data);
            return Created(new Uri(Request.RequestUri + "/" + data.MetricDataId), data);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, MetricData data)
        {
            var existingData = metricData.FirstOrDefault(md => md.MetricDataId == id);
            if (existingData == null)
            {
                return NotFound();
            }
            existingData.UserMetricId = data.UserMetricId;
            existingData.DataValue = data.DataValue;
            return Ok(existingData);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var data = metricData.FirstOrDefault(md => md.MetricDataId == id);
            if (data == null)
            {
                return NotFound();
            }
            metricData.Remove(data);
            return Ok();
        }
    }
}
