using System;
using System.Globalization;
using System.Reflection;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix("test")]
    public class TestController : ApiController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
         [AllowAnonymous]
        public IHttpActionResult Get()
        {
            var versionModel = new VersionModel
            {
                AssemblyName = Assembly.GetExecutingAssembly().GetName().Name,
                AssemblyVersion = Assembly.GetExecutingAssembly().GetName().Version.ToString(3),
                ServerEnvironment = Environment.GetEnvironmentVariable("WEB_SERVER_TIER"),
                ApplicationUpSince = Startup.ApplicationStartupTime.ToString(CultureInfo.InvariantCulture),
                BuildTimestamp = System.IO.File.GetLastWriteTime(Assembly.GetExecutingAssembly().Location).ToString("G")
            };

            return Ok(versionModel);
        }
    }
}