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

            // Mock Metric Data
            var metricData = new List<MetricData>
            {
                new MetricData { MetricDataId = 1, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 1, 1, 10, 0, 0, DateTimeKind.Utc), GroupMembershipId = 1 },
                new MetricData { MetricDataId = 2, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 1, 15, 10, 0, 0, DateTimeKind.Utc), GroupMembershipId = 1 },
                new MetricData { MetricDataId = 3, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 1, 30, 10, 0, 0, DateTimeKind.Utc), GroupMembershipId = 1 },
                new MetricData { MetricDataId = 4, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 2, 1, 11, 0, 0, DateTimeKind.Utc), GroupMembershipId = 3 },
                new MetricData { MetricDataId = 5, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 2, 15, 11, 0, 0, DateTimeKind.Utc), GroupMembershipId = 3 },
                new MetricData { MetricDataId = 6, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 2, 28, 11, 0, 0, DateTimeKind.Utc), GroupMembershipId = 3 },
                new MetricData { MetricDataId = 7, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 3, 1, 12, 0, 0, DateTimeKind.Utc), GroupMembershipId = 4 },
                new MetricData { MetricDataId = 8, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 3, 15, 12, 0, 0, DateTimeKind.Utc), GroupMembershipId = 4 },
                new MetricData { MetricDataId = 9, MetricId = 1, Name = "Performance", Date = new DateTime(2023, 3, 30, 12, 0, 0, DateTimeKind.Utc), GroupMembershipId = 4 },
                new MetricData { MetricDataId = 10, MetricId = 2, Name = "Attendance", Date = new DateTime(2023, 2, 1, 11, 0, 0, DateTimeKind.Utc), GroupMembershipId = 2 },
                new MetricData { MetricDataId = 11, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 1, 5, 10, 0, 0, DateTimeKind.Utc), GroupMembershipId = 1 },
                new MetricData { MetricDataId = 12, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 1, 20, 10, 0, 0, DateTimeKind.Utc), GroupMembershipId = 1 },
                new MetricData { MetricDataId = 13, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 1, 25, 10, 0, 0, DateTimeKind.Utc), GroupMembershipId = 1 },
                new MetricData { MetricDataId = 14, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 2, 5, 11, 0, 0, DateTimeKind.Utc), GroupMembershipId = 3 },
                new MetricData { MetricDataId = 15, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 2, 20, 11, 0, 0, DateTimeKind.Utc), GroupMembershipId = 3 },
                new MetricData { MetricDataId = 16, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 2, 25, 11, 0, 0, DateTimeKind.Utc), GroupMembershipId = 3 },
                new MetricData { MetricDataId = 17, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 3, 5, 12, 0, 0, DateTimeKind.Utc), GroupMembershipId = 4 },
                new MetricData { MetricDataId = 18, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 3, 20, 12, 0, 0, DateTimeKind.Utc), GroupMembershipId = 4 },
                new MetricData { MetricDataId = 19, MetricId = 3, Name = "Quality", Date = new DateTime(2023, 3, 25, 12, 0, 0, DateTimeKind.Utc), GroupMembershipId = 4 },
                new MetricData { MetricDataId = 20, MetricId = 4, Name = "Efficiency", Date = new DateTime(2023, 4, 1, 13, 0, 0, DateTimeKind.Utc), GroupMembershipId = 5 },
                new MetricData { MetricDataId = 21, MetricId = 4, Name = "Efficiency", Date = new DateTime(2023, 4, 15, 13, 0, 0, DateTimeKind.Utc), GroupMembershipId = 5 }
            };
            metricData.ForEach(md => context.MetricDatas.AddOrUpdate(m => m.MetricDataId, md));
            var dataEntries = new List<Data>
            {
                new Data { DataId = 1, Label = "Score", Value = 85.5, MetricDataId = 1 },
                new Data { DataId = 2, Label = "Days Present", Value = 20, MetricDataId = 10 },
                new Data { DataId = 3, Label = "Rating", Value = 90, MetricDataId = 11 },
                new Data { DataId = 4, Label = "Time Saved", Value = 5, MetricDataId = 20 },
                new Data { DataId = 5, Label = "Score", Value = 88, MetricDataId = 2 },
                new Data { DataId = 6, Label = "Rating", Value = 85, MetricDataId = 12 },
                new Data { DataId = 7, Label = "Time Saved", Value = 7, MetricDataId = 21 }
            };
            dataEntries.ForEach(data => context.Datas.AddOrUpdate(d => d.DataId, data));
            // Save changes
            context.SaveChanges();
        }
    }
}
