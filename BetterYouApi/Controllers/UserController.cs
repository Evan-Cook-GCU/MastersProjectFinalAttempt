using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(context.Users.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var user = context.Users.Include("GroupMemberships").FirstOrDefault(u => u.UserId == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(User user)
        {
            user.CreatedAt = DateTime.Now;
            context.Users.Add(user);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + user.UserId), user);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, User user)
        {
            var existingUser = context.Users.FirstOrDefault(u => u.UserId == id);
            if (existingUser == null)
            {
                return NotFound();
            }
            existingUser.UserName = user.UserName;
            existingUser.Email = user.Email;
            existingUser.PasswordHash = user.PasswordHash;
            context.SaveChanges();
            return Ok(existingUser);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var user = context.Users.FirstOrDefault(u => u.UserId == id);
            if (user == null)
            {
                return NotFound();
            }
            context.Users.Remove(user);
            context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("{userId:int}/groups")]
        public IHttpActionResult GetGroupsByUserId(int userId)
        {
            var user = context.Users.Include("GroupMemberships.Group").FirstOrDefault(u => u.UserId == userId);
            if (user == null)
            {
                return NotFound();
            }

            var groups = user.GroupMemberships.Select(gm => gm.Group).ToList();
            return Ok(groups);
        }

        [HttpPost]
        [Route("{userId:int}/groups")]
        public IHttpActionResult AddGroup(int userId, Group group)
        {
            var user = context.Users.Include("GroupMemberships").FirstOrDefault(u => u.UserId == userId);
            if (user == null)
            {
                return NotFound();
            }

            group.CreatedAt = DateTime.Now;
            context.Groups.Add(group);
            context.SaveChanges();

            var membership = new GroupMembership
            {
                UserId = userId,
                GroupId = group.GroupId,
                IsAdmin = true,
                JoinedAt = DateTime.Now
            };
            context.GroupMemberships.Add(membership);
            context.SaveChanges();

            return Created(new Uri(Request.RequestUri + "/" + group.GroupId), group);
        }
    }
}
