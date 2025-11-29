using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using System.Security.Claims;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DashboardController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetStats()
        {
            // Extract user information from claims
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRoleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
            
            if (string.IsNullOrEmpty(userIdClaim) || string.IsNullOrEmpty(userRoleClaim))
            {
                return Unauthorized("User information not found in token");
            }
            
            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest("Invalid user ID in token");
            }
            
            bool isPrivilegedUser = userRoleClaim == "admin" || userRoleClaim == "developer";
            
            // Filter analyses based on user role - server side enforcement
            var analysesQuery = _db.Analyses.AsQueryable();
            if (!isPrivilegedUser)
            {
                // For regular users, always filter by their own userId
                analysesQuery = analysesQuery.Where(a => a.OwnerId == userId);
            }
            
            var totalAnalyses = await analysesQuery.CountAsync();
            
            // Calculate success rate (percentage of analyses with score >= 70)
            var successfulAnalyses = await analysesQuery.CountAsync(a => a.Score >= 70);
            var successRate = totalAnalyses > 0 ? (double)successfulAnalyses / totalAnalyses * 100 : 0;
            
            // Calculate average ROI
            var avgROI = totalAnalyses > 0 ? await analysesQuery.AverageAsync(a => (double?)a.ExpectedROI) ?? 0 : 0;

            // Prepare response object
            // For privileged users, include activeUsers count
            // For regular users, omit activeUsers entirely (not just set to null)
            if (isPrivilegedUser)
            {
                var activeUsers = await _db.Users.CountAsync();
                return Ok(new
                {
                    totalAnalyses,
                    activeUsers,
                    successRate = Math.Round(successRate, 1),
                    avgROI = Math.Round(avgROI, 1)
                });
            }
            else
            {
                // For regular users, only return their own statistics without activeUsers
                return Ok(new
                {
                    totalAnalyses,
                    successRate = Math.Round(successRate, 1),
                    avgROI = Math.Round(avgROI, 1)
                });
            }
        }

        [HttpGet("recent-analyses")]
        public async Task<ActionResult<object>> GetRecentAnalyses([FromQuery] int count = 3)
        {
            var recentAnalyses = await _db.Analyses
                .Include(a => a.Owner)
                .Include(a => a.Template)
                .OrderByDescending(a => a.CreatedAt)
                .Take(count)
                .Select(a => new
                {
                    id = a.Id,
                    name = a.Title,
                    type = a.Template != null ? a.Template.Name : "General",
                    date = a.CreatedAt.ToString("yyyy-MM-dd"),
                    score = a.Score,
                    status = "Complete" // All saved analyses are complete
                })
                .ToListAsync();

            return Ok(recentAnalyses);
        }
    }
}
