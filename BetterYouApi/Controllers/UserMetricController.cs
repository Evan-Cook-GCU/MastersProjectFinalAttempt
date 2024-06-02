using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/usermetrics")]
    public class UserMetricController : ApiController
    {
        private static List<UserMetric> userMetrics = new List<UserMetric>();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(userMetrics);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var userMetric = userMetrics.FirstOrDefault(um => um.UserMetricId == id);
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
            userMetric.UserMetricId = userMetrics.Count + 1;
            userMetric.CreatedAt = DateTime.Now;
            userMetrics.Add(userMetric);
            return Created(new Uri(Request.RequestUri + "/" + userMetric.UserMetricId), userMetric);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, UserMetric userMetric)
        {
            var existingUserMetric = userMetrics.FirstOrDefault(um => um.UserMetricId == id);
            if (existingUserMetric == null)
            {
                return NotFound();
            }
            existingUserMetric.UserId = userMetric.UserId;
            existingUserMetric.MetricId = userMetric.MetricId;
            return Ok(existingUserMetric);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var userMetric = userMetrics.FirstOrDefault(um => um.UserMetricId == id);
            if (userMetric == null)
            {
                return NotFound();
            }
            userMetrics.Remove(userMetric);
            return Ok();
        }
    }
}
