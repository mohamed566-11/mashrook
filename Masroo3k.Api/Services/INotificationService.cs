namespace Masroo3k.Api.Services
{
    public interface INotificationService
    {
        Task NotifyAdminUserLoginAsync(int userId, string userName, string userEmail);
        Task NotifyAdminAnalysisCompletedAsync(int analysisId, string analysisTitle, int userId, string userName);
        Task NotifyUserAnalysisCompletedAsync(int analysisId, string analysisTitle, int userId);
        Task CreateNotificationAsync(int userId, string title, string message, string type = "info", string? actionUrl = null);
    }
}