using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;
using BetterYouApi.Mappings;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/conversations")]
    public class ConversationController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();
        [HttpGet]
        [Route("{userId1:int}/{userId2:int}")]
        public IHttpActionResult GetConversation(int userId1, int userId2)
        {
            var test = context.Conversations.ToList();

            var conversation = context.Conversations
                .Include("Messages")
                .FirstOrDefault(c => (c.User1Id == userId1 && c.User2Id == userId2) || (c.User1Id == userId2 && c.User2Id == userId1));

            if (conversation == null)
            {

                conversation = new Conversation();
                conversation.User1Id = userId1;
                conversation.User2Id = userId2;

                conversation.StartedAt = DateTime.Now;
                context.Conversations.Add(conversation);
                context.SaveChanges();
                return Ok(MappingProfile.ToDTO(conversation));
            }

            return Ok(MappingProfile.ToDTO(conversation));
        }


        [HttpGet]
        [Route("{userId:int}")]
        public IHttpActionResult GetUsersConversations(int userId)
        {
            var test = context.Conversations.ToList();

            var conversation = context.Conversations
                .Include("Messages")
                .Where(c => c.User1Id == userId || c.User2Id == userId).ToList();


            if (conversation == null)
            {
                return Ok(new List<ConversationDTO>());
            }
            return Ok(conversation.Select(MappingProfile.ToDTO).ToList());
        }


    }
}
