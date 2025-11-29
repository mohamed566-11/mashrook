using Microsoft.EntityFrameworkCore;
using Masroo3k.Api.Models;
using BCrypt.Net;

namespace Masroo3k.Api.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // Ensure database is created
            await context.Database.MigrateAsync();

            // Check if users already exist
            if (await context.Users.AnyAsync())
            {
                Console.WriteLine("Database already seeded. Skipping seed operation.");
                return;
            }

            Console.WriteLine("Seeding database with default users...");

            var users = new List<User>
            {
                new User
                {
                    Name = "Admin User",
                    Email = "admin@mashroo3k.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("AdminPassword123!"),
                    Role = "admin",
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Name = "John Doe",
                    Email = "john@example.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("UserPassword123!"),
                    Role = "user",
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Name = "Developer User",
                    Email = "Developer@dev.dev",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("DeveloperPassword123!"),
                    Role = "developer",
                    CreatedAt = DateTime.UtcNow
                }
            };

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();

            Console.WriteLine($"Successfully seeded {users.Count} users:");
            foreach (var user in users)
            {
                Console.WriteLine($"  - {user.Email} ({user.Role})");
            }
        }

        public static async Task SeedTemplatesAsync(AppDbContext context)
        {
            // Check if templates already exist
            if (await context.Templates.AnyAsync())
            {
                return;
            }

            Console.WriteLine("Seeding database with default templates...");

            var templates = new List<Template>
            {
                // New AI Analysis Templates
                new Template
                {
                    Name = "AI Business Validator",
                    Description = "Validate your business idea with AI-powered analysis and recommendations.",
                    Category = "Business Validation",
                    Duration = 25,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "SWOT & PESTEL Analysis",
                    Description = "Comprehensive strategic analysis combining SWOT and PESTEL frameworks for market insights.",
                    Category = "SWOT & PESTEL",
                    Duration = 30,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "Building Your Marketing Plan",
                    Description = "Create a comprehensive marketing strategy with actionable steps and KPIs.",
                    Category = "Marketing",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "Financial Performance Assessment",
                    Description = "Analyze financial health and identify opportunities for improvement.",
                    Category = "Financial",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "Assessing Growth Readiness",
                    Description = "Evaluate your organization's preparedness for scaling operations and identify key growth barriers.",
                    Category = "Growth",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "Assessing Growth Readiness",
                    Description = "Evaluate your organization's preparedness for scaling operations and identify key growth barriers.",
                    Category = "Growth",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "Gap Analysis",
                    Description = "Identify gaps between current and desired performance levels with actionable recommendations.",
                    Category = "Gap Analysis",
                    Duration = 20,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "AI Business Health Check",
                    Description = "Comprehensive assessment of your business's AI readiness and optimization opportunities.",
                    Category = "Health Check",
                    Duration = 15,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "Digital Maturity Assessment",
                    Description = "Evaluate your organization's digital capabilities and roadmap for transformation.",
                    Category = "Digital",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "AI Pitch Deck Generator",
                    Description = "Create compelling investor presentations with data-driven insights and projections.",
                    Category = "Pitch Deck",
                    Duration = 30,
                    IsPopular = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Template
                {
                    Name = "SWOT Analysis",
                    Description = "Strategic planning tool to identify strengths, weaknesses, opportunities, and threats.",
                    Category = "Strategic Planning",
                    Duration = 25,
                    IsPopular = false,
                    CreatedAt = DateTime.UtcNow
                }
            };

            await context.Templates.AddRangeAsync(templates);
            await context.SaveChangesAsync();

            Console.WriteLine($"Successfully seeded {templates.Count} templates.");
        }
    }
}