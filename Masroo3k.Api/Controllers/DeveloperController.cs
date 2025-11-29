using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;
using Masroo3k.Api.Models;
using Masroo3k.Api.DTOs;
using Masroo3k.Api.Services;
using BCrypt.Net;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeveloperController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IActivityLogService _activityLog;
        private readonly IIPAddressService _ipAddressService;

        public DeveloperController(AppDbContext db, IActivityLogService activityLog, IIPAddressService ipAddressService)
        {
            _db = db;
            _activityLog = activityLog;
            _ipAddressService = ipAddressService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> DeveloperLogin([FromBody] DeveloperLoginRequest request)
        {
            // Hard-coded developer credentials
            if (request.Email.ToLower() != "developer@dev.dev" || request.Password != "DeveloperPassword123!")
            {
                // Log failed login attempt
                await _activityLog.LogAsync(
                    "DeveloperLoginFailed", "User", null,
                    $"Failed developer login attempt for email: {request.Email}",
                    ipAddress: _ipAddressService.GetClientIpAddress(HttpContext),
                    userAgent: Request.Headers["User-Agent"].ToString(),
                    severity: "Warning"
                );
                return Unauthorized(new { message = "Invalid developer credentials" });
            }

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == "developer@dev.dev");

            if (user == null)
            {
                // Create developer user if not exists
                user = new User
                {
                    Name = "Developer User",
                    Email = "Developer@dev.dev",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("DeveloperPassword123!"),
                    Role = "developer",
                    CreatedAt = DateTime.UtcNow
                };

                _db.Users.Add(user);
                await _db.SaveChangesAsync();
            }

            // Log successful login
            await _activityLog.LogLoginAsync(
                user.Id,
                _ipAddressService.GetClientIpAddress(HttpContext),
                Request.Headers["User-Agent"].ToString() ?? "Unknown",
                true
            );

            var response = new LoginResponse
            {
                User = new UserResponse
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                },
                Token = null // For now, we'll add JWT later if needed
            };

            return Ok(response);
        }

        [HttpGet("templates")]
        public async Task<ActionResult<IEnumerable<TemplateDto>>> GetTemplates()
        {
            var templates = await _db.Templates
                .Include(t => t.Fields)
                .Select(t => new TemplateDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    Category = t.Category,
                    Duration = t.Duration,
                    IsPopular = t.IsPopular,
                    CreatedAt = t.CreatedAt,
                    FieldsCount = t.Fields.Count
                })
                .ToListAsync();

            return Ok(templates);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            var categories = await _db.Templates
                .Select(t => t.Category)
                .Distinct()
                .ToListAsync();

            return Ok(categories);
        }
    }

    public class DeveloperLoginRequest
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}