using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;
using BetterYouApi.Mappings;
using System.Collections.Generic;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/groups")]
    public class GroupController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            var groups = context.Groups.ToList().Select(MappingProfile.ToDTO);
            return Ok(groups);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var group = context.Groups.Include("Metrics").FirstOrDefault(g => g.GroupId == id);
            if (group == null)
            {
                return NotFound();
            }
            return Ok(MappingProfile.ToDTO(group));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(GroupDTO groupDto)
        {
            var group = MappingProfile.ToModel(groupDto);
            group.CreatedAt = DateTime.Now;
            context.Groups.Add(group);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + group.GroupId), MappingProfile.ToDTO(group));
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, GroupDTO groupDto)
        {
            var existingGroup = context.Groups.FirstOrDefault(g => g.GroupId == id);
            if (existingGroup == null)
            {
                return NotFound();
            }
            existingGroup.GroupName = groupDto.GroupName;
            existingGroup.Description = groupDto.Description;
            context.SaveChanges();
            return Ok(MappingProfile.ToDTO(existingGroup));
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var group = context.Groups.FirstOrDefault(g => g.GroupId == id);
            if (group == null)
            {
                return NotFound();
            }
            context.Groups.Remove(group);
            context.SaveChanges();
            return Ok();
        }
        // New endpoint to get all metrics by group ID
        [HttpGet]
        [Route("{id:int}/metrics")]
        public IHttpActionResult GetMetricsByGroupId(int id)
        {
            var metrics = context.Metrics.Where(m => m.GroupId == id).ToList();
            if (!metrics.Any())
            {
                return NotFound();
            }
            return Ok(metrics.Select(MappingProfile.ToDTO));
        }
        // New endpoint to get all metrics by group ID
        [HttpGet]
        [Route("{id:int}/Members")]
        public IHttpActionResult GetGroupMembers(int id)
        {
            var memberships = context.GroupMemberships.Where(m => m.GroupId == id).ToList();
            
            if (!memberships.Any())
            {
                return NotFound();
            }
            var members=new List<UserDTO>();
            foreach (var membership in memberships)
            {
                var member=context.Users.FirstOrDefault(m=>m.UserId==membership.UserId); ;
                members.Add(MappingProfile.ToDTO(member));
            }
            return Ok(members);
        }
    }
}
