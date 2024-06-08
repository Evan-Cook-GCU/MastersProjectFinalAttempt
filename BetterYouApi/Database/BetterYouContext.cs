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
        public DbSet<UserMetric> UserMetrics { get; set; }
        public DbSet<MetricData> MetricDatas { get; set; }
    }

}