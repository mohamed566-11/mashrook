using Masroo3k.Api.Models;

namespace Masroo3k.Api.Services
{
    public interface IActivityLogService
    {
        Task LogAsync(string action, string entityType, int? entityId, string description, 
            string? details = null, int? userId = null, string? ipAddress = null, 
            string? userAgent = null, string severity = "Info");
        
        Task LogLoginAsync(int userId, string ipAddress, string userAgent, bool success);
        Task LogLogoutAsync(int userId, string ipAddress, string userAgent);
        Task LogCreateAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent);
        Task LogUpdateAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent);
        Task LogDeleteAsync(string entityType, int entityId, int userId, string ipAddress, string userAgent);
        Task LogErrorAsync(string description, string? details, string? ipAddress, string? userAgent);
    }
}