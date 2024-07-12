using BetterYouApi.Models;
using Microsoft.AspNet.SignalR;
using System;
using System.Linq;

namespace BetterYouApi.Hubs
{
    public class ChatHub : Hub
    {
        private BetterYouContext context = new BetterYouContext();
        public void SendMessage(string user, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(user, message);
        }
        public void SendGroupMessage(string groupId, string user, string message)
        {
            int groupIdInt = int.Parse(groupId);
            var group = context.Groups.FirstOrDefault(g => g.GroupId == groupIdInt);
            var sender = context.Users.FirstOrDefault(u => u.UserName == user);

            if (group != null && sender != null)
            {
                var chatMessage = new GroupChatMessage
                {
                    GroupId = groupIdInt,
                    SenderId = sender.UserId,
                    Content = message,
                    SentAt = DateTime.Now
                };

                context.GroupChatMessages.Add(chatMessage);
                context.SaveChanges();
                // Call the broadcastMessage method to update clients.
                Clients.All.broadcastGrpupMessage(groupId, user, message);
            }
        }
    }
}
