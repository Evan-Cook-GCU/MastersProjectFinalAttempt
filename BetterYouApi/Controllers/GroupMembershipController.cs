using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;
using BetterYouApi.Mappings;
using System.Collections.Generic;

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
            var memberships = context.GroupMemberships.ToList().Select(MappingProfile.ToDTO);
            return Ok(memberships);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var membership = context.GroupMemberships.Include("MetricData").FirstOrDefault(m => m.MembershipId == id);
            if (membership == null)
            {
                return NotFound();
            }
            return Ok(MappingProfile.ToDTO(membership));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(GroupMembershipDTO membershipDto)
        {
            var membership = MappingProfile.ToModel(membershipDto);
            membership.JoinedAt = DateTime.Now;
            context.GroupMemberships.Add(membership);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + membership.MembershipId), MappingProfile.ToDTO(membership));
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, GroupMembershipDTO membershipDto)
        {
            var existingMembership = context.GroupMemberships.FirstOrDefault(m => m.MembershipId == id);
            if (existingMembership == null)
            {
                return NotFound();
            }
            existingMembership.UserId = membershipDto.UserId;
            existingMembership.GroupId = membershipDto.GroupId;
            existingMembership.IsAdmin = membershipDto.IsAdmin;
            context.SaveChanges();
            return Ok(MappingProfile.ToDTO(existingMembership));
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
        [HttpGet]
        [Route("user/{userId:int}/group/{groupId:int}")]
        public IHttpActionResult GetMembershipByUserIdAndGroupId(int userId, int groupId)
        {
            // Fetch user's group memberships
            var memberships = context.GroupMemberships.Where(gm => gm.UserId == userId).ToList();

            if (!memberships.Any())
            {
                return NotFound();
            }
            var membershipDto = memberships.FirstOrDefault(m=>m.GroupId==groupId);
            return Ok(MappingProfile.ToDTO(membershipDto));
        }
    }
}
