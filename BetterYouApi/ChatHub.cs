using Microsoft.AspNet.SignalR;

namespace BetterYouApi.Hubs
{
    public class ChatHub : Hub
    {
        public void SendMessage(string user, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(user, message);
        }
    }
}
