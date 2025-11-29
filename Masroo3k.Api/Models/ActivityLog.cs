namespace Masroo3k.Api.Models
{
    public class ActivityLog
    {
        public int Id { get; set; }
        public string Action { get; set; } = null!; // Login, Logout, Create, Update, Delete, View, Error
        public string EntityType { get; set; } = null!; // User, Analysis, Template, System
        public int? EntityId { get; set; } // ID of the affected entity (optional)
        public string Description { get; set; } = null!;
        public string? Details { get; set; } // Additional JSON details
        public string IpAddress { get; set; } = null!;
        public string UserAgent { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Severity { get; set; } = "Info"; // Info, Warning, Error, Critical
        
        // User who performed the action (nullable for system actions)
        public int? UserId { get; set; }
        public User? User { get; set; }
    }
}