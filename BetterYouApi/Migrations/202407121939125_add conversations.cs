namespace BetterYouApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addconversations : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ConversationMessages",
                c => new
                    {
                        MessageId = c.Int(nullable: false, identity: true),
                        ConversationId = c.Int(nullable: false),
                        SenderId = c.Int(nullable: false),
                        Content = c.String(),
                        SentAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.MessageId)
                .ForeignKey("dbo.Conversations", t => t.ConversationId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.SenderId, cascadeDelete: true)
                .Index(t => t.ConversationId)
                .Index(t => t.SenderId);
            
            CreateTable(
                "dbo.Conversations",
                c => new
                    {
                        ConversationId = c.Int(nullable: false, identity: true),
                        StartedAt = c.DateTime(nullable: false),
                        User1Id = c.Int(nullable: false),
                        User2Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ConversationId)
                .ForeignKey("dbo.Users", t => t.User1Id)
                .ForeignKey("dbo.Users", t => t.User2Id)
                .Index(t => t.User1Id)
                .Index(t => t.User2Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ConversationMessages", "SenderId", "dbo.Users");
            DropForeignKey("dbo.ConversationMessages", "ConversationId", "dbo.Conversations");
            DropForeignKey("dbo.Conversations", "User2Id", "dbo.Users");
            DropForeignKey("dbo.Conversations", "User1Id", "dbo.Users");
            DropIndex("dbo.Conversations", new[] { "User2Id" });
            DropIndex("dbo.Conversations", new[] { "User1Id" });
            DropIndex("dbo.ConversationMessages", new[] { "SenderId" });
            DropIndex("dbo.ConversationMessages", new[] { "ConversationId" });
            DropTable("dbo.Conversations");
            DropTable("dbo.ConversationMessages");
        }
    }
}
