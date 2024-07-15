namespace BetterYouApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addbannedstatus : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GroupMemberships", "IsBanned", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.GroupMemberships", "IsBanned");
        }
    }
}
