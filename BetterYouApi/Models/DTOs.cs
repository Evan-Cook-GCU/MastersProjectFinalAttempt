using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetterYouApi.Models
{
    public class UserDTO
    {
        
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GroupDTO
    {
        
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GroupMembershipDTO
    {
        
        public int MembershipId { get; set; }

        public int UserId { get; set; }
        public int GroupId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime JoinedAt { get; set; }

    }

    public class MetricDTO
    {
        
        public int MetricId { get; set; }
        public string Name { get; set; }
        public List<FieldDTO> Fields { get; set; }
        public int GroupId { get; set; } // Added foreign key relations
    }

    public class FieldDTO
    {
        
        public int FieldId { get; set; }
        public string Label { get; set; }
        public string Type { get; set; }
        public int MetricId { get; set; } // Added foreign key relationship
    }

    public class MetricDataDTO
    {
        
        public int MetricDataId { get; set; }

        public int MetricId { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; } // Add the date property
        public List<DataDTO> Fields { get; set; }
        
        public int GroupMembershipId { get; set; } // Added foreign key relationship

    }

    public class DataDTO
    {
        public int DataId { get; set; }
        public string Label { get; set; }
        public double Value { get; set; }
        public int MetricDataId { get; set; }
    }
    
}
