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
    }

    public class Group
    {
        [Key]
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ICollection<GroupMembership> GroupMemberships { get; set; }
        public virtual ICollection<Metric> Metrics { get; set; } // Added relationship
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
        public bool IsBanned { get; set; }
        public DateTime JoinedAt { get; set; }

        public virtual User User { get; set; }
        public virtual Group Group { get; set; }
        public virtual ICollection<MetricData> MetricData { get; set; } // Added relationship
    }

    public class Metric
    {
        [Key]
        public int MetricId { get; set; }
        public string Name { get; set; }

        [ForeignKey("Group")]
        public int GroupId { get; set; } // Added foreign key relationship

        public virtual Group Group { get; set; }
        public virtual ICollection<Field> Fields { get; set; }
        public virtual ICollection<MetricData> Data { get; set; }
    }

    public class Field
    {
        [Key]
        public int FieldId { get; set; }
        public string Label { get; set; }
        public string Type { get; set; }
        [ForeignKey("Metric")]
        public int MetricId { get; set; }
        public virtual Metric Metric { get; set; } // Added navigation property


    }

    public class MetricData
    {
        [Key]
        public int MetricDataId { get; set; }

        [ForeignKey("Metric")]
        public int MetricId { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; } // Add the date property

        [ForeignKey("GroupMembership")]
        public int GroupMembershipId { get; set; } // Added foreign key relationship

        public virtual Metric Metric { get; set; }
        public virtual GroupMembership GroupMembership { get; set; }
        public virtual ICollection<Data> Fields { get; set; }
        public virtual ICollection<Data> Data { get; set; }
    }

    public class Data
    {
        [Key]
        public int DataId { get; set; }
        public string Label { get; set; }
        public double Value { get; set; }

        [ForeignKey("MetricData")]
        public int MetricDataId { get; set; }

        public virtual MetricData MetricData { get; set; } // Added navigation property
    }
    public class GroupChatMessage
    {
        [Key]
        public int ChatMessageId { get; set; }

        [ForeignKey("Group")]
        public int GroupId { get; set; }

        [ForeignKey("User")]
        public int SenderId { get; set; }
        public string Content { get; set; }
        public DateTime SentAt { get; set; }
        public virtual Group Group { get; set; }
        public virtual User User { get; set; }
    }
    public class Conversation
    {
        [Key]
        public int ConversationId { get; set; }
        public DateTime StartedAt { get; set; }

        [ForeignKey("User1")]
        public int User1Id { get; set; }
        public virtual User User1 { get; set; }

        [ForeignKey("User2")]
        public int User2Id { get; set; }
        public virtual User User2 { get; set; }

        public virtual ICollection<ConversationMessage> Messages { get; set; }
    }

    public class ConversationMessage
    {
        [Key]
        public int MessageId { get; set; }

        [ForeignKey("Conversation")]
        public int ConversationId { get; set; }
        public virtual Conversation Conversation { get; set; }

        [ForeignKey("Sender")]
        public int SenderId { get; set; }
        public virtual User Sender { get; set; }

        public string Content { get; set; }
        public DateTime SentAt { get; set; }
    }
}
