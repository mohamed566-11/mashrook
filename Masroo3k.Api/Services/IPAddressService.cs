namespace Masroo3k.Api.Services
{
    public interface IIPAddressService
    {
        string GetClientIpAddress(HttpContext httpContext);
    }

    public class IPAddressService : IIPAddressService
    {
        private readonly ILogger<IPAddressService> _logger;

        public IPAddressService(ILogger<IPAddressService> logger)
        {
            _logger = logger;
        }

        public string GetClientIpAddress(HttpContext httpContext)
        {
            try
            {
                // Try to get IP from X-Forwarded-For header (when behind proxy/load balancer)
                var forwardedFor = httpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault();
                if (!string.IsNullOrEmpty(forwardedFor))
                {
                    // X-Forwarded-For can contain multiple IPs, take the first (client IP)
                    var ips = forwardedFor.Split(',', StringSplitOptions.RemoveEmptyEntries);
                    if (ips.Length > 0)
                    {
                        var clientIp = ips[0].Trim();
                        _logger.LogDebug("Client IP from X-Forwarded-For: {IP}", clientIp);
                        return clientIp;
                    }
                }

                // Try X-Real-IP header (nginx)
                var realIp = httpContext.Request.Headers["X-Real-IP"].FirstOrDefault();
                if (!string.IsNullOrEmpty(realIp))
                {
                    _logger.LogDebug("Client IP from X-Real-IP: {IP}", realIp);
                    return realIp;
                }

                // Fallback to RemoteIpAddress
                var remoteIp = httpContext.Connection.RemoteIpAddress;
                if (remoteIp != null)
                {
                    var ipString = remoteIp.ToString();
                    
                    // Convert IPv6 loopback to IPv4 for better readability
                    if (ipString == "::1")
                    {
                        ipString = "127.0.0.1";
                    }
                    // Map IPv4-mapped IPv6 addresses to IPv4
                    else if (remoteIp.IsIPv4MappedToIPv6)
                    {
                        ipString = remoteIp.MapToIPv4().ToString();
                    }

                    _logger.LogDebug("Client IP from RemoteIpAddress: {IP}", ipString);
                    return ipString;
                }

                _logger.LogWarning("Unable to determine client IP address");
                return "Unknown";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting client IP address");
                return "Unknown";
            }
        }
    }
}