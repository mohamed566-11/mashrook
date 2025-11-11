using Masroo3k.Api.Data;
using Masroo3k.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Masroo3k.Api.Services
{
    public class ActivityLogService : IActivityLogService
    {
        private readonly AppDbContext _db;
        private readonly ILogger<ActivityLogService> _logger;

        public ActivityLogService(AppDbContext db, ILogger<ActivityLogService> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task LogAsync(string action, string entityType, int? entityId, string description,
            string? details = null, int? userId = null, string? ipAddress = null,
            string? userAgent = null, string severity = "Info")
        {
            try
            {
                var log = new ActivityLog
                {
                    Action = action,
                    EntityType = entityType,
                    EntityId = entityId,
                    Description = description,
                    Details = details,
                    UserId = userId,
                    IpAddress = ipAddress ?? "Unknown",
                    UserAgent = userAgent ?? "Unknown",
                    Severity = severity,
                    CreatedAt = DateTime.UtcNow
                };

                _db.ActivityLogs.Add(log);
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Don't throw - logging should never break the application
                _logger.LogError(ex, "Failed to log activity");
            }
        }

        public async Task LogLoginAsync(int userId, string ipAddress, string userAgent, bool success)
        {
            await LogAsync(
                action: success ? "LoginSuccess" : "LoginFailed",
                entityType: "User",
                entityId: userId,
                description: success ? $"User {userId} logged in successfully" : $"Failed login attempt for user {userId}",
                userId: success ? userId : null,
                ipAddress: ipAddress,
                userAgent: userAgent,
                severity: success ? "Info" : "Warning"
            );
        }

        public async Task LogLogoutAsync(int userId, string ipAddress, string userAgent)
        {
            await LogAsync(
                action: "Logout",
                entityType: "User",
                entityId: userId,
                description: $"User {userId} logged out",
                userId: userId,
                ipAddress: ipAddress,
                userAgent: userAgent
            );
        }

        public async Task LogCreateAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent)
        {
            await LogAsync(
                action: "Create",
                entityType: entityType,
                entityId: entityId,
                description: $"Created {entityType} with ID {entityId}",
                userId: userId,
                ipAddress: ipAddress,
                userAgent: userAgent
            );
        }

        public async Task LogUpdateAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent)
        {
            await LogAsync(
                action: "Update",
                entityType: entityType,
                entityId: entityId,
                description: $"Updated {entityType} with ID {entityId}",
                userId: userId,
                ipAddress: ipAddress,
                userAgent: userAgent
            );
        }

        public async Task LogDeleteAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent)
        {
            await LogAsync(
                action: "Delete",
                entityType: entityType,
                entityId: entityId,
                description: $"Deleted {entityType} with ID {entityId}",
                userId: userId,
                ipAddress: ipAddress,
                userAgent: userAgent,
                severity: "Warning"
            );
        }

        public async Task LogErrorAsync(string description, string? details, string? ipAddress, string? userAgent)
        {
            await LogAsync(
                action: "Error",
                entityType: "System",
                entityId: null,
                description: description,
                details: details,
                ipAddress: ipAddress,
                userAgent: userAgent,
                severity: "Error"
            );
        }
    }
}