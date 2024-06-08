/// <summary>
/// 
/// </summary>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BetterYouApi.Models
{


    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<GroupMembership> GroupMemberships { get; set; }
        public virtual ICollection<UserMetric> UserMetrics { get; set; }
    }

    public class Group
    {
        [Key]
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<GroupMembership> GroupMemberships { get; set; }
    }

    public class GroupMembership
    {
        [Key]
        public int MembershipId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        [ForeignKey("Group")]
        public int GroupId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime JoinedAt { get; set; }

        public virtual User User { get; set; }
        public virtual Group Group { get; set; }
    }

    public class Metric
    {
        [Key]
        public int MetricId { get; set; }
        public string MetricName { get; set; }
        public string MetricType { get; set; }
        public string Description { get; set; }

        public virtual ICollection<UserMetric> UserMetrics { get; set; }
    }

    public class UserMetric
    {
        [Key]
        public int UserMetricId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        [ForeignKey("Metric")]
        public int MetricId { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual User User { get; set; }
        public virtual Metric Metric { get; set; }
        public virtual ICollection<MetricData> MetricData { get; set; }
    }

    public class MetricData
    {
        [Key]
        public int MetricDataId { get; set; }

        [ForeignKey("UserMetric")]
        public int UserMetricId { get; set; }
        public string DataValue { get; set; }
        public DateTime DataDate { get; set; }

        public virtual UserMetric UserMetric { get; set; }
    }

}