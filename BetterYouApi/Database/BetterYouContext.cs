/// <summary>
/// 
/// </summary>
using System.Collections.Generic;
using System;
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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }

}