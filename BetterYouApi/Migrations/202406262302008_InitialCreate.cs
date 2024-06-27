namespace BetterYouApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Data",
                c => new
                    {
                        DataId = c.Int(nullable: false, identity: true),
                        Label = c.String(),
                        Value = c.Double(nullable: false),
                        MetricData_MetricDataId = c.Int(),
                    })
                .PrimaryKey(t => t.DataId)
                .ForeignKey("dbo.MetricDatas", t => t.MetricData_MetricDataId)
                .Index(t => t.MetricData_MetricDataId);
            
            CreateTable(
                "dbo.Fields",
                c => new
                    {
                        FieldId = c.Int(nullable: false, identity: true),
                        Label = c.String(),
                        Type = c.String(),
                        Metric_MetricId = c.Int(),
                    })
                .PrimaryKey(t => t.FieldId)
                .ForeignKey("dbo.Metrics", t => t.Metric_MetricId)
                .Index(t => t.Metric_MetricId);
            
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
                "dbo.Metrics",
                c => new
                    {
                        MetricId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        GroupId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MetricId)
                .ForeignKey("dbo.Groups", t => t.GroupId, cascadeDelete: true)
                .Index(t => t.GroupId);
            
            CreateTable(
                "dbo.MetricDatas",
                c => new
                    {
                        MetricDataId = c.Int(nullable: false, identity: true),
                        MetricId = c.Int(nullable: false),
                        Name = c.String(),
                        Date = c.DateTime(nullable: false),
                        GroupMembershipId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MetricDataId)
                .ForeignKey("dbo.GroupMemberships", t => t.GroupMembershipId, cascadeDelete: false)
                .ForeignKey("dbo.Metrics", t => t.MetricId, cascadeDelete: true)
                .Index(t => t.MetricId)
                .Index(t => t.GroupMembershipId);
            
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GroupMemberships", "UserId", "dbo.Users");
            DropForeignKey("dbo.GroupMemberships", "GroupId", "dbo.Groups");
            DropForeignKey("dbo.Metrics", "GroupId", "dbo.Groups");
            DropForeignKey("dbo.Fields", "Metric_MetricId", "dbo.Metrics");
            DropForeignKey("dbo.MetricDatas", "MetricId", "dbo.Metrics");
            DropForeignKey("dbo.MetricDatas", "GroupMembershipId", "dbo.GroupMemberships");
            DropForeignKey("dbo.Data", "MetricData_MetricDataId", "dbo.MetricDatas");
            DropIndex("dbo.MetricDatas", new[] { "GroupMembershipId" });
            DropIndex("dbo.MetricDatas", new[] { "MetricId" });
            DropIndex("dbo.Metrics", new[] { "GroupId" });
            DropIndex("dbo.GroupMemberships", new[] { "GroupId" });
            DropIndex("dbo.GroupMemberships", new[] { "UserId" });
            DropIndex("dbo.Fields", new[] { "Metric_MetricId" });
            DropIndex("dbo.Data", new[] { "MetricData_MetricDataId" });
            DropTable("dbo.Users");
            DropTable("dbo.MetricDatas");
            DropTable("dbo.Metrics");
            DropTable("dbo.Groups");
            DropTable("dbo.GroupMemberships");
            DropTable("dbo.Fields");
            DropTable("dbo.Data");
        }
    }
}
