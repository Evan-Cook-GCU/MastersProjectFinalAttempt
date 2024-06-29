using System;
using System.Collections.Generic;
using System.Linq;
using BetterYouApi.Models;

namespace BetterYouApi.Mappings
{
    public class MappingProfile
    {
        public static UserDTO ToDTO(User user)
        {
            return new UserDTO
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                CreatedAt = user.CreatedAt
            };
        }

        public static User ToModel(UserDTO userDto)
        {
            return new User
            {
                UserId = userDto.UserId,
                UserName = userDto.UserName,
                Email = userDto.Email,
                PasswordHash = userDto.PasswordHash,
                CreatedAt = userDto.CreatedAt
            };
        }

        public static GroupDTO ToDTO(Group group)
        {
            return new GroupDTO
            {
                GroupId = group.GroupId,
                GroupName = group.GroupName,
                Description = group.Description,
                CreatedAt = group.CreatedAt
            };
        }

        public static Group ToModel(GroupDTO groupDto)
        {
            return new Group
            {
                GroupId = groupDto.GroupId,
                GroupName = groupDto.GroupName,
                Description = groupDto.Description,
                CreatedAt = groupDto.CreatedAt
            };
        }

        public static GroupMembershipDTO ToDTO(GroupMembership membership)
        {
            return new GroupMembershipDTO
            {
                MembershipId = membership.MembershipId,
                UserId = membership.UserId,
                GroupId = membership.GroupId,
                IsAdmin = membership.IsAdmin,
                JoinedAt = membership.JoinedAt
            };
        }

        public static GroupMembership ToModel(GroupMembershipDTO membershipDto)
        {
            return new GroupMembership
            {
                MembershipId = membershipDto.MembershipId,
                UserId = membershipDto.UserId,
                GroupId = membershipDto.GroupId,
                IsAdmin = membershipDto.IsAdmin,
                JoinedAt = membershipDto.JoinedAt
            };
        }

        public static MetricDTO ToDTO(Metric metric)
        {
            return new MetricDTO
            {
                MetricId = metric.MetricId,
                Name = metric.Name,
                GroupId = metric.GroupId
            };
        }

        public static Metric ToModel(MetricDTO metricDto)
        {
            return new Metric
            {
                MetricId = metricDto.MetricId,
                Name = metricDto.Name,
                GroupId = metricDto.GroupId
            };
        }

        public static FieldDTO ToDTO(Field field)
        {
            return new FieldDTO
            {
                FieldId = field.FieldId,
                Label = field.Label,
                Type = field.Type,
                MetricId = field.MetricId
            };
        }

        public static Field ToModel(FieldDTO fieldDto)
        {
            return new Field
            {
                FieldId = fieldDto.FieldId,
                Label = fieldDto.Label,
                Type = fieldDto.Type,
                MetricId = fieldDto.MetricId
            };
        }

        public static MetricDataDTO ToDTO(MetricData metricData)
        {
            return new MetricDataDTO
            {
                MetricDataId = metricData.MetricDataId,
                MetricId = metricData.MetricId,
                Name = metricData.Name,
                Date = metricData.Date,
                GroupMembershipId = metricData.GroupMembershipId
            };
        }

        public static MetricData ToModel(MetricDataDTO metricDataDto)
        {
            return new MetricData
            {
                MetricDataId = metricDataDto.MetricDataId,
                MetricId = metricDataDto.MetricId,
                Name = metricDataDto.Name,
                Date = metricDataDto.Date,
                GroupMembershipId = metricDataDto.GroupMembershipId
            };
        }

        public static DataDTO ToDTO(Data data)
        {
            return new DataDTO
            {
                DataId = data.DataId,
                Label = data.Label,
                Value = data.Value,
                MetricDataId = data.MetricDataId
            };
        }

        public static Data ToModel(DataDTO dataDto)
        {
            return new Data
            {
                DataId = dataDto.DataId,
                Label = dataDto.Label,
                Value = dataDto.Value,
                MetricDataId = dataDto.MetricDataId
            };
        }
    }
}
