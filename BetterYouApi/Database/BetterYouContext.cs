/// <summary>
/// 
/// </summary>
using System.Data.Entity;
namespace BetterYouApi.Models
{
    public class BetterYouContext : DbContext
    {
        public BetterYouContext() : base("name=BetterYouDB")
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupMembership> GroupMemberships { get; set; }
        public DbSet<Metric> Metrics { get; set; }
        public DbSet<MetricData> MetricDatas { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<Data> Datas { get; set; }
        public DbSet<GroupChatMessage> GroupChatMessages { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<ConversationMessage> ConversationMessages { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ConversationMessage>()
                .HasRequired(cm => cm.Conversation)
                .WithMany(c => c.Messages)
                .HasForeignKey(cm => cm.ConversationId);

            modelBuilder.Entity<ConversationMessage>()
                .HasRequired(cm => cm.Sender)
                .WithMany()
                .HasForeignKey(cm => cm.SenderId);

            modelBuilder.Entity<Conversation>()
                .HasRequired(c => c.User1)
                .WithMany()
                .HasForeignKey(c => c.User1Id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Conversation>()
                .HasRequired(c => c.User2)
                .WithMany()
                .HasForeignKey(c => c.User2Id)
                .WillCascadeOnDelete(false);

            base.OnModelCreating(modelBuilder);
        }
    }

}