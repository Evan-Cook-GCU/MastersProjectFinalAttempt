using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/metricdata")]
    public class MetricDataController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(context.MetricDatas.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var data = context.MetricDatas.FirstOrDefault(md => md.MetricDataId == id);
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
            data.DataDate = DateTime.Now;
            context.MetricDatas.Add(data);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + data.MetricDataId), data);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, MetricData data)
        {
            var existingData = context.MetricDatas.FirstOrDefault(md => md.MetricDataId == id);
            if (existingData == null)
            {
                return NotFound();
            }
            existingData.UserMetricId = data.UserMetricId;
            existingData.DataValue = data.DataValue;
            context.SaveChanges();
            return Ok(existingData);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var data = context.MetricDatas.FirstOrDefault(md => md.MetricDataId == id);
            if (data == null)
            {
                return NotFound();
            }
            context.MetricDatas.Remove(data);
            context.SaveChanges();
            return Ok();
        }
    }
}
