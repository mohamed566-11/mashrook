using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Masroo3k.Api.Data;
using Masroo3k.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Masroo3k API", Version = "v1" });

    if (builder.Environment.IsDevelopment())
    {
        c.AddServer(new OpenApiServer
        {
            Url = "http://localhost:5221",
            Description = "Development HTTP"
        });

        c.AddServer(new OpenApiServer
        {
            Url = "https://localhost:7143",
            Description = "Development HTTPS"
        });
    }
    else
    {
        // Use the deployment hostname dynamically
        c.AddServer(new OpenApiServer
        {
            Url = "/",
            Description = "Production Server"
        });
    }
});

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
                  .AllowAnyMethod()
                  .WithExposedHeaders("Authorization"));
    }
    else
    {
        options.AddPolicy("ProductionPolicy", policy =>
            policy.WithOrigins(
                "https://www.mashra3k.com",
                "http://localhost:3000",
                "https://localhost:3000",
                "http://mashroo3kai.runasp.net",
                "https://masroo3k-jegosu5wr-joes-projects-aa3b4e99.vercel.app"
                "http://mashroo3kai.runasp.net/swagger/index.html"
            )
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials()
                  .WithExposedHeaders("Authorization"));
    }
});

var app = builder.Build();

// Swagger must always run BEFORE middleware
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Masroo3k API v1");
    c.RoutePrefix = "swagger";
});

// Error handling
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// CORS BEFORE Authorization
app.UseCors(app.Environment.IsDevelopment() ? "AllowFrontend" : "ProductionPolicy");

// Enable HTTPS redirection only in production
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

// Serve static files
app.UseStaticFiles();

// API Controllers
app.MapControllers();

// SPA fallback for frontend hosting
if (!app.Environment.IsDevelopment())
{
    app.MapFallbackToFile("index.html");
}

app.Run();