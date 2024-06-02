using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        private static List<User> users = new List<User>();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(users);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var user = users.FirstOrDefault(u => u.UserId == id);
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
            user.UserId = users.Count + 1;
            user.CreatedAt = DateTime.Now;
            users.Add(user);
            return Created(new Uri(Request.RequestUri + "/" + user.UserId), user);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, User user)
        {
            var existingUser = users.FirstOrDefault(u => u.UserId == id);
            if (existingUser == null)
            {
                return NotFound();
            }
            existingUser.UserName = user.UserName;
            existingUser.Email = user.Email;
            existingUser.PasswordHash = user.PasswordHash;
            return Ok(existingUser);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var user = users.FirstOrDefault(u => u.UserId == id);
            if (user == null)
            {
                return NotFound();
            }
            users.Remove(user);
            return Ok();
        }
    }
}
