using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/groupmemberships")]
    public class GroupMembershipController : ApiController
    {
        private static List<GroupMembership> memberships = new List<GroupMembership>();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(memberships);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var membership = memberships.FirstOrDefault(m => m.MembershipId == id);
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
            membership.MembershipId = memberships.Count + 1;
            membership.JoinedAt = DateTime.Now;
            memberships.Add(membership);
            return Created(new Uri(Request.RequestUri + "/" + membership.MembershipId), membership);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, GroupMembership membership)
        {
            var existingMembership = memberships.FirstOrDefault(m => m.MembershipId == id);
            if (existingMembership == null)
            {
                return NotFound();
            }
            existingMembership.UserId = membership.UserId;
            existingMembership.GroupId = membership.GroupId;
            existingMembership.IsAdmin = membership.IsAdmin;
            return Ok(existingMembership);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var membership = memberships.FirstOrDefault(m => m.MembershipId == id);
            if (membership == null)
            {
                return NotFound();
            }
            memberships.Remove(membership);
            return Ok();
        }
    }
}
