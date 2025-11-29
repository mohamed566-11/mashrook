using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using Masroo3k.Api.Models;
using Masroo3k.Api.DTOs;
using Masroo3k.Api.Services;
using Newtonsoft.Json;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalysesController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IAIAnalysisService _aiService;
        private readonly IActivityLogService _activityLog;
        private readonly INotificationService _notificationService;
        private readonly IIPAddressService _ipAddressService;

        public AnalysesController(AppDbContext db, IAIAnalysisService aiService, IActivityLogService activityLog, INotificationService notificationService, IIPAddressService ipAddressService)
        {
            _db = db;
            _aiService = aiService;
            _activityLog = activityLog;
            _notificationService = notificationService;
            _ipAddressService = ipAddressService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnalysisListItem>>> GetAll(
            [FromQuery] int? userId = null,
            [FromQuery] string? userRole = null)
        {
            var query = _db.Analyses
                .Include(a => a.Owner)
                .Include(a => a.Template)
                .AsQueryable();

            // Filter based on user role:
            // - If user is admin or developer, show all analyses
            // - If user is regular user, only show their own analyses
            if (userId.HasValue && userRole != "admin" && userRole != "developer")
            {
                query = query.Where(a => a.OwnerId == userId.Value);
            }

            var items = await query
                .OrderByDescending(a => a.CreatedAt)
                .Select(a => new AnalysisListItem
                {
                    Id = a.Id,
                    Title = a.Title,
                    CreatedAt = a.CreatedAt.ToString("o"),
                    OwnerEmail = a.Owner != null ? a.Owner.Email : null,
                    TemplateName = a.Template != null ? a.Template.Name : null,
                    Score = a.Score,
                    RiskLevel = a.RiskLevel,
                    SuccessPercent = a.SuccessPercent,
                    Investment = a.Investment,
                    ExpectedROI = a.ExpectedROI
                })
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AnalysisResponse>> GetById(int id)
        {
            var item = await _db.Analyses
                .Include(a => a.Owner)
                .Include(a => a.Template)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (item == null) return NotFound();

            var response = new AnalysisResponse
            {
                Id = item.Id,
                Title = item.Title,
                Content = item.Content,
                Score = item.Score,
                RiskLevel = item.RiskLevel,
                SuccessPercent = item.SuccessPercent,
                Investment = item.Investment,
                ExpectedROI = item.ExpectedROI,
                CreatedAt = item.CreatedAt,
                OwnerName = item.Owner?.Name,
                TemplateName = item.Template?.Name,
                ExecutiveSummary = item.ExecutiveSummary,
                KeyFindings = string.IsNullOrEmpty(item.KeyFindings) ? null : JsonConvert.DeserializeObject<List<string>>(item.KeyFindings),
                Recommendations = string.IsNullOrEmpty(item.Recommendations) ? null : JsonConvert.DeserializeObject<List<string>>(item.Recommendations)
            };

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<AnalysisResponse>> Create([FromBody] CreateAnalysisRequest request)
        {
            // Extract investment value from form data
            decimal initialInvestment = 10000; // Default value
            
            if (!string.IsNullOrEmpty(request.Content))
            {
                try
                {
                    var formData = JsonConvert.DeserializeObject<AnalysisFormDataWrapper>(request.Content);
                    if (formData?.Step2?.InitialInvestment != null)
                    {
                        initialInvestment = Convert.ToDecimal(formData.Step2.InitialInvestment);
                    }
                }
                catch (Exception)
                {
                    // Log the error but continue with default value
                    // In a production environment, you might want to handle this differently
                }
            }

            // Generate AI analysis
            var aiRequest = new BusinessAnalysisRequest
            {
                BusinessIdea = request.Title,
                Industry = request.TemplateId.HasValue ? "General" : "General",
                TargetMarket = "Target Market",
                InitialInvestment = initialInvestment, // Use dynamic value
                AdditionalDetails = request.Content
            };

            var aiResult = await _aiService.GenerateAnalysisAsync(aiRequest);

            var analysis = new Analysis
            {
                Title = request.Title,
                Content = request.Content,
                OwnerId = request.OwnerId,
                TemplateId = request.TemplateId,
                Score = aiResult.OverallScore,
                RiskLevel = aiResult.RiskLevel,
                SuccessPercent = aiResult.SuccessProbability,
                Investment = aiResult.Investment,
                ExpectedROI = aiResult.ProjectedROI,
                ExecutiveSummary = aiResult.ExecutiveSummary,
                KeyFindings = JsonConvert.SerializeObject(aiResult.KeyFindings),
                Recommendations = JsonConvert.SerializeObject(aiResult.Recommendations)
            };

            _db.Analyses.Add(analysis);
            await _db.SaveChangesAsync();

            // Log analysis creation
            await _activityLog.LogCreateAsync(
                "Analysis",
                analysis.Id,
                request.OwnerId,
                _ipAddressService.GetClientIpAddress(HttpContext),
                Request.Headers["User-Agent"].ToString() ?? "Unknown"
            );

            // Get user details for notifications
            var user = await _db.Users.FindAsync(request.OwnerId);
            if (user != null)
            {
                // Notify the user that their analysis is complete
                await _notificationService.NotifyUserAnalysisCompletedAsync(
                    analysis.Id,
                    analysis.Title,
                    user.Id
                );

                // Notify admins about the new analysis
                await _notificationService.NotifyAdminAnalysisCompletedAsync(
                    analysis.Id,
                    analysis.Title,
                    user.Id,
                    user.Name
                );
            }

            return CreatedAtAction(nameof(GetById), new { id = analysis.Id }, new AnalysisResponse
            {
                Id = analysis.Id,
                Title = analysis.Title,
                Content = analysis.Content,
                Score = analysis.Score,
                RiskLevel = analysis.RiskLevel,
                SuccessPercent = analysis.SuccessPercent,
                Investment = analysis.Investment,
                ExpectedROI = analysis.ExpectedROI,
                CreatedAt = analysis.CreatedAt,
                ExecutiveSummary = analysis.ExecutiveSummary,
                KeyFindings = aiResult.KeyFindings,
                Recommendations = aiResult.Recommendations
            });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _db.Analyses.FindAsync(id);
            if (item == null) return NotFound();

            // Get user info for logging before deleting
            var ownerId = item.OwnerId;

            _db.Analyses.Remove(item);
            await _db.SaveChangesAsync();

            // Log analysis deletion
            await _activityLog.LogDeleteAsync(
                "Analysis",
                id,
                ownerId,
                _ipAddressService.GetClientIpAddress(HttpContext),
                Request.Headers["User-Agent"].ToString() ?? "Unknown"
            );

            return NoContent();
        }
    }
}

public class AnalysisFormDataWrapper
{
    [JsonProperty("formData")]
    public Step2Data? Step2 { get; set; }
}

public class Step2Data
{
    [JsonProperty("initialInvestment")]
    public object? InitialInvestment { get; set; }
}
