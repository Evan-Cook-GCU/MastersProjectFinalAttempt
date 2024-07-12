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

       

        
    }
}
