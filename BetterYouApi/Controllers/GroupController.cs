using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/groups")]
    public class GroupController : ApiController
    {
        private static List<Group> groups = new List<Group>();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(groups);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var group = groups.FirstOrDefault(g => g.GroupId == id);
            if (group == null)
            {
                return NotFound();
            }
            return Ok(group);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(Group group)
        {
            group.GroupId = groups.Count + 1;
            group.CreatedAt = DateTime.Now;
            groups.Add(group);
            return Created(new Uri(Request.RequestUri + "/" + group.GroupId), group);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, Group group)
        {
            var existingGroup = groups.FirstOrDefault(g => g.GroupId == id);
            if (existingGroup == null)
            {
                return NotFound();
            }
            existingGroup.GroupName = group.GroupName;
            existingGroup.Description = group.Description;
            return Ok(existingGroup);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var group = groups.FirstOrDefault(g => g.GroupId == id);
            if (group == null)
            {
                return NotFound();
            }
            groups.Remove(group);
            return Ok();
        }
    }
}
