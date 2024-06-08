namespace BetterYouApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GroupMemberships",
                c => new
                    {
                        MembershipId = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        GroupId = c.Int(nullable: false),
                        IsAdmin = c.Boolean(nullable: false),
                        JoinedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.MembershipId)
                .ForeignKey("dbo.Groups", t => t.GroupId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.GroupId);
            
            CreateTable(
                "dbo.Groups",
                c => new
                    {
                        GroupId = c.Int(nullable: false, identity: true),
                        GroupName = c.String(),
                        Description = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.GroupId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                        Email = c.String(),
                        PasswordHash = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.UserMetrics",
                c => new
                    {
                        UserMetricId = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        MetricId = c.Int(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.UserMetricId)
                .ForeignKey("dbo.Metrics", t => t.MetricId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.MetricId);
            
            CreateTable(
                "dbo.Metrics",
                c => new
                    {
                        MetricId = c.Int(nullable: false, identity: true),
                        MetricName = c.String(),
                        MetricType = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.MetricId);
            
            CreateTable(
                "dbo.MetricDatas",
                c => new
                    {
                        MetricDataId = c.Int(nullable: false, identity: true),
                        UserMetricId = c.Int(nullable: false),
                        DataValue = c.String(),
                        DataDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.MetricDataId)
                .ForeignKey("dbo.UserMetrics", t => t.UserMetricId, cascadeDelete: true)
                .Index(t => t.UserMetricId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GroupMemberships", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserMetrics", "UserId", "dbo.Users");
            DropForeignKey("dbo.MetricDatas", "UserMetricId", "dbo.UserMetrics");
            DropForeignKey("dbo.UserMetrics", "MetricId", "dbo.Metrics");
            DropForeignKey("dbo.GroupMemberships", "GroupId", "dbo.Groups");
            DropIndex("dbo.MetricDatas", new[] { "UserMetricId" });
            DropIndex("dbo.UserMetrics", new[] { "MetricId" });
            DropIndex("dbo.UserMetrics", new[] { "UserId" });
            DropIndex("dbo.GroupMemberships", new[] { "GroupId" });
            DropIndex("dbo.GroupMemberships", new[] { "UserId" });
            DropTable("dbo.MetricDatas");
            DropTable("dbo.Metrics");
            DropTable("dbo.UserMetrics");
            DropTable("dbo.Users");
            DropTable("dbo.Groups");
            DropTable("dbo.GroupMemberships");
        }
    }
}
