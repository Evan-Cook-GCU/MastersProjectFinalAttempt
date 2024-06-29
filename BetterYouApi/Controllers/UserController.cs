using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using BetterYouApi.Mappings;
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
            var users = context.Users.ToList().Select(MappingProfile.ToDTO);
            return Ok(users);
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
            return Ok(MappingProfile.ToDTO(user));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(UserDTO userDto)
        {
            var user = MappingProfile.ToModel(userDto);
            user.CreatedAt = DateTime.Now;
            context.Users.Add(user);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + user.UserId), MappingProfile.ToDTO(user));
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, UserDTO userDto)
        {
            var existingUser = context.Users.FirstOrDefault(u => u.UserId == id);
            if (existingUser == null)
            {
                return NotFound();
            }
            existingUser.UserName = userDto.UserName;
            existingUser.Email = userDto.Email;
            existingUser.PasswordHash = userDto.PasswordHash;
            context.SaveChanges();
            return Ok(MappingProfile.ToDTO(existingUser));
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

            var groups = user.GroupMemberships.Select(gm => MappingProfile.ToDTO(gm.Group)).ToList();
            return Ok(groups);
        }

        [HttpPost]
        [Route("{userId:int}/groups")]
        public IHttpActionResult AddGroup(int userId, GroupDTO groupDto)
        {
            var user = context.Users.Include("GroupMemberships").FirstOrDefault(u => u.UserId == userId);
            if (user == null)
            {
                return NotFound();
            }

            var group = MappingProfile.ToModel(groupDto);
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

            return Created(new Uri(Request.RequestUri + "/" + group.GroupId), MappingProfile.ToDTO(group));
        }
        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login(LoginDTO loginDto)
        {
            var user = context.Users.FirstOrDefault(u => u.UserName == loginDto.UserName);
            if (user == null)
            {
                return Unauthorized();
            }

            if (!VerifyPassword(loginDto.Password, user.PasswordHash))
            {
                return Unauthorized();
            }

            // Assuming a token generation method exists
            //var token = GenerateToken(user);
            
            return Ok(MappingProfile.ToDTO(user));
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            // Replace with your hash verification logic
            //using (var sha256 = SHA256.Create())
            {
                //var hashedInput = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
                //return hashedInput == storedHash;
            }
            return true; 
        }

        private string GenerateToken(User user)
        {
            // Replace with your token generation logic
            return "dummy-token";
        }
    }

    public class LoginDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}

