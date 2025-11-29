using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using Masroo3k.Api.Models;

namespace Masroo3k.Api.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _db;

        public NotificationService(AppDbContext db)
        {
            _db = db;
        }

        public async Task NotifyAdminUserLoginAsync(int userId, string userName, string userEmail)
        {
            // Get all admin users
            var adminUsers = await _db.Users
                .Where(u => u.Role == "admin")
                .ToListAsync();

            foreach (var admin in adminUsers)
            {
                await CreateNotificationAsync(
                    admin.Id,
                    "New User Login",
                    $"{userName} ({userEmail}) has logged in to the system.",
                    "info"
                );
            }
        }

        public async Task NotifyAdminAnalysisCompletedAsync(int analysisId, string analysisTitle, int userId, string userName)
        {
            // Get all admin users
            var adminUsers = await _db.Users
                .Where(u => u.Role == "admin")
                .ToListAsync();

            foreach (var admin in adminUsers)
            {
                await CreateNotificationAsync(
                    admin.Id,
                    "New Analysis Completed",
                    $"{userName} has completed a new analysis: \"{analysisTitle}\"",
                    "success",
                    $"#/report/{analysisId}"
                );
            }
        }

        public async Task NotifyUserAnalysisCompletedAsync(int analysisId, string analysisTitle, int userId)
        {
            await CreateNotificationAsync(
                userId,
                "Analysis Completed",
                $"Your analysis \"{analysisTitle}\" has been successfully generated and is ready to view.",
                "success",
                $"#/report/{analysisId}"
            );
        }

        public async Task CreateNotificationAsync(int userId, string title, string message, string type = "info", string? actionUrl = null)
        {
            var notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = message,
                Type = type,
                ActionUrl = actionUrl,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _db.Notifications.Add(notification);
            await _db.SaveChangesAsync();
        }
    }
}
