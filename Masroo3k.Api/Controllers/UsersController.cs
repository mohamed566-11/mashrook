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
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IActivityLogService _activityLog;
        private readonly IIPAddressService _ipAddressService;

        public UsersController(AppDbContext db, IActivityLogService activityLog, IIPAddressService ipAddressService)
        {
            _db = db;
            _activityLog = activityLog;
            _ipAddressService = ipAddressService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            var users = await _db.Users
                .Include(u => u.Analyses)
                .Select(u => new
                {
                    id = u.Id,
                    name = u.Name,
                    email = u.Email,
                    role = u.Role,
                    status = "Active",
                    analyses = u.Analyses.Count,
                    lastLogin = u.CreatedAt.ToString("MM/dd/yyyy")
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserResponse>> GetById(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();

            return Ok(new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            });
        }

        [HttpPost]
        public async Task<ActionResult<UserResponse>> Create([FromBody] CreateUserRequest request)
        {
            // Check if email already exists
            if (await _db.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role ?? "user"
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // Log user creation
            await _activityLog.LogCreateAsync(
                "User",
                user.Id,
                user.Id, // The new user is the subject
                _ipAddressService.GetClientIpAddress(HttpContext),
                Request.Headers["User-Agent"].ToString() ?? "Unknown"
            );

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateUserRequest request)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();

            // Check if email is being changed and if it already exists
            if (user.Email != request.Email && await _db.Users.AnyAsync(u => u.Email == request.Email && u.Id != id))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            user.Name = request.Name;
            user.Email = request.Email;
            user.Role = request.Role;
            
            // Only update password if provided
            if (!string.IsNullOrEmpty(request.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            }

            await _db.SaveChangesAsync();
            
            // Log user update
            await _activityLog.LogUpdateAsync(
                "User",
                user.Id,
                user.Id, // The user being updated
                _ipAddressService.GetClientIpAddress(HttpContext),
                Request.Headers["User-Agent"].ToString() ?? "Unknown"
            );
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();

            // Store user info before deletion for logging
            var userId = user.Id;

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();

            // Log user deletion
            await _activityLog.LogDeleteAsync(
                "User",
                userId,
                userId, // The deleted user
                _ipAddressService.GetClientIpAddress(HttpContext),
                Request.Headers["User-Agent"].ToString() ?? "Unknown"
            );

            return NoContent();
        }

        [HttpPut("{id:int}/profile")]
        public async Task<ActionResult<UserResponse>> UpdateProfile(int id, [FromBody] UpdateProfileRequest request)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();

            // Check if email is being changed and if it already exists
            if (user.Email != request.Email && await _db.Users.AnyAsync(u => u.Email == request.Email && u.Id != id))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // If changing password, verify current password
            if (!string.IsNullOrEmpty(request.NewPassword))
            {
                if (string.IsNullOrEmpty(request.CurrentPassword))
                {
                    return BadRequest(new { message = "Current password is required to set a new password" });
                }

                if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
                {
                    return BadRequest(new { message = "Current password is incorrect" });
                }

                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            }

            user.Name = request.Name;
            user.Email = request.Email;

            await _db.SaveChangesAsync();
            
            // Log profile update
            await _activityLog.LogUpdateAsync(
                "User",
                user.Id,
                user.Id,
                _ipAddressService.GetClientIpAddress(HttpContext),
                Request.Headers["User-Agent"].ToString() ?? "Unknown"
            );

            return Ok(new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            });
        }
    }
}