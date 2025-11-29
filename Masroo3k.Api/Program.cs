using Microsoft.EntityFrameworkCore;
using System.Linq;

using Masroo3k.Api.Data;
using Masroo3k.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register AI Analysis Service
builder.Services.AddHttpClient<IAIAnalysisService, GeminiAIService>();
builder.Services.AddScoped<IAIAnalysisService, GeminiAIService>();

// Register Activity Log Service
builder.Services.AddScoped<IActivityLogService, ActivityLogService>();

// Register Notification Service
builder.Services.AddScoped<INotificationService, NotificationService>();

// Register IP Address Service
builder.Services.AddScoped<IIPAddressService, IPAddressService>();

// Configure CORS for frontend
builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.AddPolicy("AllowFrontend", policy =>
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod());
    }
    else
    {
        // Production CORS policy
        options.AddPolicy("ProductionPolicy", policy =>
            policy.WithOrigins("https://www.mashra3k.com")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials());
    }
});

var app = builder.Build();

// Get logger for startup messages
var logger = app.Services.GetRequiredService<ILogger<Program>>();
logger.LogInformation("========================================");
logger.LogInformation("Masroo3k Business Analysis API Startup");
logger.LogInformation("========================================");
logger.LogInformation("Starting application...");

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        logger.LogInformation("Starting database seeding...");
        var context = services.GetRequiredService<AppDbContext>();
        
        // Check if migrations need to be applied
        var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
        if (pendingMigrations.Any())
        {
            logger.LogInformation("Applying pending migrations...");
            try
            {
                await context.Database.MigrateAsync();
            }
            catch (Exception migrateEx) when (migrateEx.Message.Contains("already exists"))
            {
                logger.LogInformation("Database tables already exist, skipping migration.");
            }
        }
        else
        {
            logger.LogInformation("No pending migrations to apply.");
        }
        
        // Only seed if the database is empty
        if (!context.Users.Any())
        {
            await DbSeeder.SeedAsync(context);
            await DbSeeder.SeedTemplatesAsync(context);
            logger.LogInformation("Database seeding completed successfully.");
        }
        else
        {
            logger.LogInformation("Database already contains data, skipping seeding.");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    logger.LogInformation("Development environment detected - enabling Swagger");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Production error handling
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios
    app.UseHsts();
}

logger.LogInformation("Configuring middleware pipeline...");

app.UseHttpsRedirection();

// Use appropriate CORS policy based on environment
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowFrontend");
}
else
{
    app.UseCors("ProductionPolicy");
}

app.UseAuthorization();

// Serve static files (for React app)
app.UseStaticFiles();

app.MapControllers();

// SPA fallback for client-side routing
if (!app.Environment.IsDevelopment())
{
    app.MapFallbackToFile("index.html");
}

logger.LogInformation("Application configuration complete.");
logger.LogInformation("Listening on:");
logger.LogInformation("  - HTTPS: https://localhost:7143");
logger.LogInformation("  - HTTP: http://localhost:5221");
logger.LogInformation("========================================\n");

app.Run();