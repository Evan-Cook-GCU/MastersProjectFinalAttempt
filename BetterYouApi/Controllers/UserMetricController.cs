using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/usermetrics")]
    public class UserMetricController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(context.UserMetrics.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var userMetric = context.UserMetrics.FirstOrDefault(um => um.UserMetricId == id);
            if (userMetric == null)
            {
                return NotFound();
            }
            return Ok(userMetric);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(UserMetric userMetric)
        {
            userMetric.CreatedAt = DateTime.Now;
            context.UserMetrics.Add(userMetric);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + userMetric.UserMetricId), userMetric);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, UserMetric userMetric)
        {
            var existingUserMetric = context.UserMetrics.FirstOrDefault(um => um.UserMetricId == id);
            if (existingUserMetric == null)
            {
                return NotFound();
            }
            existingUserMetric.UserId = userMetric.UserId;
            existingUserMetric.MetricId = userMetric.MetricId;
            context.SaveChanges();
            return Ok(existingUserMetric);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var userMetric = context.UserMetrics.FirstOrDefault(um => um.UserMetricId == id);
            if (userMetric == null)
            {
                return NotFound();
            }
            context.UserMetrics.Remove(userMetric);
            context.SaveChanges();
            return Ok();
        }
    }
}
