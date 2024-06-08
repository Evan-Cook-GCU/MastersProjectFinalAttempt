using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/groupmemberships")]
    public class GroupMembershipController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(context.GroupMemberships.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var membership = context.GroupMemberships.FirstOrDefault(m => m.MembershipId == id);
            if (membership == null)
            {
                return NotFound();
            }
            return Ok(membership);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(GroupMembership membership)
        {
            membership.JoinedAt = DateTime.Now;
            context.GroupMemberships.Add(membership);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + membership.MembershipId), membership);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, GroupMembership membership)
        {
            var existingMembership = context.GroupMemberships.FirstOrDefault(m => m.MembershipId == id);
            if (existingMembership == null)
            {
                return NotFound();
            }
            existingMembership.UserId = membership.UserId;
            existingMembership.GroupId = membership.GroupId;
            existingMembership.IsAdmin = membership.IsAdmin;
            context.SaveChanges();
            return Ok(existingMembership);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var membership = context.GroupMemberships.FirstOrDefault(m => m.MembershipId == id);
            if (membership == null)
            {
                return NotFound();
            }
            context.GroupMemberships.Remove(membership);
            context.SaveChanges();
            return Ok();
        }
    }
}
