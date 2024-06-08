using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

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
            return Ok(context.Groups.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var group = context.Groups.FirstOrDefault(g => g.GroupId == id);
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
            group.CreatedAt = DateTime.Now;
            context.Groups.Add(group);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + group.GroupId), group);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, Group group)
        {
            var existingGroup = context.Groups.FirstOrDefault(g => g.GroupId == id);
            if (existingGroup == null)
            {
                return NotFound();
            }
            existingGroup.GroupName = group.GroupName;
            existingGroup.Description = group.Description;
            context.SaveChanges();
            return Ok(existingGroup);
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
    }
}
