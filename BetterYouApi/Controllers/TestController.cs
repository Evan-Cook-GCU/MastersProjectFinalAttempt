using System;
using System.Globalization;
using System.Reflection;
using System.Web.Http;
using BetterYouApi.Models;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BetterYouApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ApiController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
                .VerifyIdTokenAsync(request.Token);
            string uid = decodedToken.Uid;

            // Find or create user in your system using uid
            // Example: Fetch user from database

            return Ok(new { message = "User authenticated", uid });
        }
        public class GoogleLoginRequest
        {
            public string Token { get; set; }
        }
    }
}