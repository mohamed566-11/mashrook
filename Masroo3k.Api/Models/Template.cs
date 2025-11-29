using System.ComponentModel.DataAnnotations;

namespace Masroo3k.Api.Models
{
    public class Template
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 5, ErrorMessage = "Name must be between 5 and 100 characters")]
        public string Name { get; set; } = null!;
        
        [StringLength(280, MinimumLength = 20, ErrorMessage = "Description must be between 20 and 280 characters")]
        public string? Description { get; set; }
        
        [Required]
        public string Category { get; set; } = "General";
        
        [Required]
        public int Duration { get; set; } = 30;
        
        public bool IsPopular { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public ICollection<Analysis> Analyses { get; set; } = new List<Analysis>();
        
        // New relationship for template fields
        public ICollection<TemplateField> Fields { get; set; } = new List<TemplateField>();
    }
}