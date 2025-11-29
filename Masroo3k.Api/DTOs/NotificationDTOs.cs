namespace Masroo3k.Api.DTOs
{
    public class NotificationResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Message { get; set; } = null!;
        public string Type { get; set; } = null!;
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ActionUrl { get; set; }
    }

    public class CreateNotificationRequest
    {
        public int UserId { get; set; }
        public string Title { get; set; } = null!;
        public string Message { get; set; } = null!;
        public string Type { get; set; } = "info";
        public string? ActionUrl { get; set; }
    }

    public class UpdateProfileRequest
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}