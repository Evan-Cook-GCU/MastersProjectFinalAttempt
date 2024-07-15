namespace BetterYouApi.Migrations
{
    using BetterYouApi.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BetterYouApi.Models.BetterYouContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BetterYouApi.Models.BetterYouContext context)
        {
            // Mock Users
            var users = new List<User>
            {
                new User { UserId = 1, UserName = "JohnDoe", Email = "johndoe@example.com", PasswordHash = "tset", CreatedAt = new DateTime(2022, 1, 1, 10, 0, 0, DateTimeKind.Utc) },
                new User { UserId = 2, UserName = "JaneSmith", Email = "janesmith@example.com", PasswordHash = "5d41402abc4b2a76b9719d911017c592", CreatedAt = new DateTime(2022, 2, 1, 11, 0, 0, DateTimeKind.Utc) },
                new User { UserId = 3, UserName = "AliceJohnson", Email = "alicejohnson@example.com", PasswordHash = "7c6a180b36896a0a8c02787eeafb0e4c", CreatedAt = new DateTime(2022, 3, 1, 12, 0, 0, DateTimeKind.Utc) },
                new User { UserId = 4, UserName = "BobBrown", Email = "bobbrown@example.com", PasswordHash = "098f6bcd4621d373cade4e832627b4f6", CreatedAt = new DateTime(2022, 4, 1, 13, 0, 0, DateTimeKind.Utc) }
            };
            users.ForEach(user => context.Users.AddOrUpdate(u => u.UserId, user));

            // Mock Groups
            var groups = new List<Group>
            {
                new Group { GroupId = 1, GroupName = "Admin", Description = "Administrators Group", CreatedAt = new DateTime(2022, 1, 1, 10, 0, 0, DateTimeKind.Utc) },
                new Group { GroupId = 2, GroupName = "Users", Description = "Regular Users Group", CreatedAt = new DateTime(2022, 2, 1, 11, 0, 0, DateTimeKind.Utc) },
                new Group { GroupId = 3, GroupName = "Managers", Description = "Managers Group", CreatedAt = new DateTime(2022, 3, 1, 12, 0, 0, DateTimeKind.Utc) }
            };
            groups.ForEach(group => context.Groups.AddOrUpdate(g => g.GroupId, group));

            // Mock Group Memberships
            var groupMemberships = new List<GroupMembership>
            {
                new GroupMembership { MembershipId = 1, UserId = 1, GroupId = 1, IsAdmin = true, JoinedAt = new DateTime(2022, 1, 1, 10, 0, 0, DateTimeKind.Utc) },
                new GroupMembership { MembershipId = 2, UserId = 2, GroupId = 2, IsAdmin = false, JoinedAt = new DateTime(2022, 2, 1, 11, 0, 0, DateTimeKind.Utc) },
                new GroupMembership { MembershipId = 3, UserId = 2, GroupId = 1, IsAdmin = false, JoinedAt = new DateTime(2022, 2, 1, 11, 0, 0, DateTimeKind.Utc) },
                new GroupMembership { MembershipId = 4, UserId = 3, GroupId = 1, IsAdmin = false, JoinedAt = new DateTime(2022, 3, 1, 12, 0, 0, DateTimeKind.Utc) },
                new GroupMembership { MembershipId = 5, UserId = 4, GroupId = 3, IsAdmin = false, JoinedAt = new DateTime(2022, 4, 1, 13, 0, 0, DateTimeKind.Utc) }
            };
            groupMemberships.ForEach(groupMembership => context.GroupMemberships.AddOrUpdate(gm => gm.MembershipId, groupMembership));

            // Mock Metrics
            var metrics = new List<Metric>
            {
                new Metric { MetricId = 1, Name = "Performance", GroupId = 1 },
                new Metric { MetricId = 2, Name = "Attendance", GroupId = 2 },
                new Metric { MetricId = 3, Name = "Quality", GroupId = 1 },
                new Metric { MetricId = 4, Name = "Efficiency", GroupId = 3 }
            };
            metrics.ForEach(metric => context.Metrics.AddOrUpdate(m => m.MetricId, metric));

            // Mock Fields
            var fields = new List<Field>
            {
                new Field { FieldId = 1, Label = "Score", Type = "number", MetricId = 1 },
                new Field { FieldId = 2, Label = "Days Present", Type = "number", MetricId = 2 },
                new Field { FieldId = 3, Label = "Rating", Type = "number", MetricId = 3 },
                new Field { FieldId = 4, Label = "Time Saved", Type = "number", MetricId = 4 }
            };
            fields.ForEach(field => context.Fields.AddOrUpdate(f => f.FieldId, field));

            
            // Save changes
            context.SaveChanges();
        }
    }
}
