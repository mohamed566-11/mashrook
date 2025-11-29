namespace Masroo3k.Api.Models
{
    public class Analysis
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Content { get; set; }
        public int Score { get; set; } = 0;
        public string RiskLevel { get; set; } = "Medium";
        public int SuccessPercent { get; set; } = 0;
        public decimal Investment { get; set; } = 0;
        public decimal ExpectedROI { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // AI Analysis Results
        public string? ExecutiveSummary { get; set; }
        public string? KeyFindings { get; set; } // JSON array
        public string? Recommendations { get; set; } // JSON array

        public int OwnerId { get; set; }
        public User? Owner { get; set; }

        public int? TemplateId { get; set; }
        public Template? Template { get; set; }
    }
}