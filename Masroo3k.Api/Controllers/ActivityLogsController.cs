using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using Masroo3k.Api.DTOs;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityLogsController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ILogger<ActivityLogsController> _logger;

        public ActivityLogsController(AppDbContext db, ILogger<ActivityLogsController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<object>> GetLogs(
            [FromQuery] string? action = null,
            [FromQuery] string? entityType = null,
            [FromQuery] string? severity = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] string? searchTerm = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 50)
        {
            _logger.LogInformation("Fetching activity logs - Page: {Page}, PageSize: {PageSize}, Action: {Action}, Severity: {Severity}",
                page, pageSize, action ?? "All", severity ?? "All");
            
            var query = _db.ActivityLogs
                .Include(al => al.User)
                .AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(action))
                query = query.Where(al => al.Action == action);

            if (!string.IsNullOrEmpty(entityType))
                query = query.Where(al => al.EntityType == entityType);

            if (!string.IsNullOrEmpty(severity))
                query = query.Where(al => al.Severity == severity);

            if (startDate.HasValue)
                query = query.Where(al => al.CreatedAt >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(al => al.CreatedAt <= endDate.Value);

            if (!string.IsNullOrEmpty(searchTerm))
                query = query.Where(al => 
                    al.Description.Contains(searchTerm) || 
                    al.IpAddress.Contains(searchTerm) ||
                    (al.User != null && (al.User.Name.Contains(searchTerm) || al.User.Email.Contains(searchTerm)))
                );

            var total = await query.CountAsync();

            _logger.LogInformation("Found {Total} activity logs matching criteria", total);

            var logs = await query
                .OrderByDescending(al => al.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(al => new ActivityLogResponse
                {
                    Id = al.Id,
                    Action = al.Action,
                    EntityType = al.EntityType,
                    EntityId = al.EntityId,
                    Description = al.Description,
                    Details = al.Details,
                    IpAddress = al.IpAddress,
                    UserAgent = al.UserAgent,
                    CreatedAt = al.CreatedAt,
                    Severity = al.Severity,
                    UserId = al.UserId,
                    UserName = al.User != null ? al.User.Name : null,
                    UserEmail = al.User != null ? al.User.Email : null
                })
                .ToListAsync();

            _logger.LogInformation("Returning {Count} activity logs for page {Page}", logs.Count, page);

            return Ok(new
            {
                logs,
                total,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling(total / (double)pageSize)
            });
        }

        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetStats()
        {
            _logger.LogInformation("Fetching activity log statistics");
            var now = DateTime.UtcNow;
            var today = now.Date;
            var last7Days = today.AddDays(-7);
            var last30Days = today.AddDays(-30);

            var stats = new
            {
                todayCount = await _db.ActivityLogs.CountAsync(al => al.CreatedAt >= today),
                last7DaysCount = await _db.ActivityLogs.CountAsync(al => al.CreatedAt >= last7Days),
                last30DaysCount = await _db.ActivityLogs.CountAsync(al => al.CreatedAt >= last30Days),
                totalCount = await _db.ActivityLogs.CountAsync(),
                
                errorCount = await _db.ActivityLogs.CountAsync(al => al.Severity == "Error" || al.Severity == "Critical"),
                warningCount = await _db.ActivityLogs.CountAsync(al => al.Severity == "Warning"),
                
                actionStats = await _db.ActivityLogs
                    .GroupBy(al => al.Action)
                    .Select(g => new { action = g.Key, count = g.Count() })
                    .OrderByDescending(x => x.count)
                    .Take(10)
                    .ToListAsync(),
                
                recentErrors = await _db.ActivityLogs
                    .Where(al => al.Severity == "Error" || al.Severity == "Critical")
                    .OrderByDescending(al => al.CreatedAt)
                    .Take(5)
                    .Select(al => new
                    {
                        al.Description,
                        al.CreatedAt,
                        al.Severity
                    })
                    .ToListAsync()
            };

            _logger.LogInformation("Stats - Total: {Total}, Today: {Today}, Errors: {Errors}, Warnings: {Warnings}",
                stats.totalCount, stats.todayCount, stats.errorCount, stats.warningCount);

            return Ok(stats);
        }

        [HttpGet("actions")]
        public async Task<ActionResult<List<string>>> GetActions()
        {
            var actions = await _db.ActivityLogs
                .Select(al => al.Action)
                .Distinct()
                .OrderBy(a => a)
                .ToListAsync();

            return Ok(actions);
        }

        [HttpGet("entity-types")]
        public async Task<ActionResult<List<string>>> GetEntityTypes()
        {
            var entityTypes = await _db.ActivityLogs
                .Select(al => al.EntityType)
                .Distinct()
                .OrderBy(et => et)
                .ToListAsync();

            return Ok(entityTypes);
        }

        [HttpDelete("clear-old")]
        public async Task<ActionResult> ClearOldLogs([FromQuery] int daysToKeep = 90)
        {
            var cutoffDate = DateTime.UtcNow.AddDays(-daysToKeep);
            var logsToDelete = await _db.ActivityLogs
                .Where(al => al.CreatedAt < cutoffDate)
                .ToListAsync();

            _db.ActivityLogs.RemoveRange(logsToDelete);
            await _db.SaveChangesAsync();

            return Ok(new { deleted = logsToDelete.Count, message = $"Successfully deleted {logsToDelete.Count} old activity logs" });
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteLog(int id)
        {
            _logger.LogInformation("Deleting activity log with ID: {Id}", id);

            var log = await _db.ActivityLogs.FindAsync(id);
            if (log == null)
            {
                _logger.LogWarning("Activity log with ID {Id} not found", id);
                return NotFound(new { message = "Activity log not found" });
            }

            _db.ActivityLogs.Remove(log);
            await _db.SaveChangesAsync();

            _logger.LogInformation("Successfully deleted activity log with ID: {Id}", id);
            return Ok(new { message = "Activity log deleted successfully" });
        }
    }
}