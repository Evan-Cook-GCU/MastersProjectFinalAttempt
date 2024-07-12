using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;
using BetterYouApi.Mappings;
using System.Collections.Generic;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/groupchat")]
    public class GroupChatController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("{groupId:int}/history")]
        public IHttpActionResult GetGroupChatHistory(int groupId)
        {
            var chatMessages = context.GroupChatMessages
                .Where(m => m.GroupId == groupId)
                .OrderBy(m => m.SentAt)
                .ToList()
                .Select(MappingProfile.ToDTO).ToList();

            if (!chatMessages.Any())
            {
                return Ok(new List<GroupChatMessageDTO>());
            }

            return Ok(chatMessages);
        }
    }
}
