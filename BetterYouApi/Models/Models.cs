/// <summary>
/// 
/// </summary>
using System;
namespace BetterYouApi.Models
{


    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class Group
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GroupMembership
    {
        public int MembershipId { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime JoinedAt { get; set; }
    }

    public class Metric
    {
        public int MetricId { get; set; }
        public string MetricName { get; set; }
        public string MetricType { get; set; }
        public string Description { get; set; }
    }

    public class UserMetric
    {
        public int UserMetricId { get; set; }
        public int UserId { get; set; }
        public int MetricId { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class MetricData
    {
        public int MetricDataId { get; set; }
        public int UserMetricId { get; set; }
        public string DataValue { get; set; }
        public DateTime DataDate { get; set; }
    }

}