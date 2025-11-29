using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Masroo3k.Api.Controllers;
using Masroo3k.Api.Data;
using System.Security.Claims;
using Xunit;

namespace Masroo3k.Api.Tests.Controllers
{
    public class DashboardControllerTests
    {
        private readonly Mock<AppDbContext> _mockContext;
        private readonly DashboardController _controller;

        public DashboardControllerTests()
        {
            _mockContext = new Mock<AppDbContext>();
            _controller = new DashboardController(_mockContext.Object);
        }

        [Fact]
        public async Task GetStats_ReturnsUnauthorized_WhenUserClaimsAreMissing()
        {
            // Arrange
            var user = new ClaimsPrincipal(new ClaimsIdentity());
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = await _controller.GetStats();

            // Assert
            var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result.Result);
            Assert.Equal("User information not found in token", unauthorizedResult.Value);
        }

        [Fact]
        public async Task GetStats_ReturnsBadRequest_WhenUserIdIsInvalid()
        {
            // Arrange
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "invalid"),
                new Claim(ClaimTypes.Role, "user")
            };
            var user = new ClaimsPrincipal(new ClaimsIdentity(claims));
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = await _controller.GetStats();

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("Invalid user ID in token", badRequestResult.Value);
        }

        // Additional tests would be implemented here for the full functionality
        // This is a basic structure to demonstrate the testing approach
    }
}