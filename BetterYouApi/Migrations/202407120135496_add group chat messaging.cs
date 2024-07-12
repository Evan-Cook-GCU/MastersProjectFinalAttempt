namespace BetterYouApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addgroupchatmessaging : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GroupChatMessages",
                c => new
                    {
                        ChatMessageId = c.Int(nullable: false, identity: true),
                        GroupId = c.Int(nullable: false),
                        SenderId = c.Int(nullable: false),
                        Content = c.String(),
                        SentAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ChatMessageId)
                .ForeignKey("dbo.Groups", t => t.GroupId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.SenderId, cascadeDelete: true)
                .Index(t => t.GroupId)
                .Index(t => t.SenderId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GroupChatMessages", "SenderId", "dbo.Users");
            DropForeignKey("dbo.GroupChatMessages", "GroupId", "dbo.Groups");
            DropIndex("dbo.GroupChatMessages", new[] { "SenderId" });
            DropIndex("dbo.GroupChatMessages", new[] { "GroupId" });
            DropTable("dbo.GroupChatMessages");
        }
    }
}
