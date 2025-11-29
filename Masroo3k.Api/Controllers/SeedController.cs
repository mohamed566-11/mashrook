using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Data;

namespace Masroo3k.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<SeedController> _logger;

        public SeedController(AppDbContext context, ILogger<SeedController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Manually trigger database seeding (Development only)
        /// </summary>
        [HttpPost("run")]
        public async Task<IActionResult> RunSeeder()
        {
            try
            {
                await DbSeeder.SeedAsync(_context);
                await DbSeeder.SeedTemplatesAsync(_context);
                return Ok(new { message = "Database seeded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error seeding database");
                return StatusCode(500, new { message = "Error seeding database", error = ex.Message });
            }
        }

        /// <summary>
        /// Reset and re-seed the database (Development only - DANGER!)
        /// </summary>
        [HttpPost("reset")]
        public async Task<IActionResult> ResetAndSeed()
        {
            try
            {
                // Delete all data
                _context.Analyses.RemoveRange(_context.Analyses);
                _context.Users.RemoveRange(_context.Users);
                _context.Templates.RemoveRange(_context.Templates);
                await _context.SaveChangesAsync();

                // Re-seed
                await DbSeeder.SeedAsync(_context);
                await DbSeeder.SeedTemplatesAsync(_context);

                return Ok(new { message = "Database reset and re-seeded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resetting database");
                return StatusCode(500, new { message = "Error resetting database", error = ex.Message });
            }
        }

        /// <summary>
        /// Get seeding status
        /// </summary>
        [HttpGet("status")]
        public async Task<IActionResult> GetStatus()
        {
            var userCount = await _context.Users.CountAsync();
            var templateCount = await _context.Templates.CountAsync();
            var analysisCount = await _context.Analyses.CountAsync();

            return Ok(new
            {
                users = userCount,
                templates = templateCount,
                analyses = analysisCount,
                isSeeded = userCount > 0
            });
        }
    }
}
