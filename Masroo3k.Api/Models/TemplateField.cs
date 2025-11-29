using System.ComponentModel.DataAnnotations;

namespace Masroo3k.Api.Models
{
    public class TemplateField
    {
        public int Id { get; set; }
        
        public int TemplateId { get; set; }
        public Template Template { get; set; } = null!;
        
        [Range(1, 5, ErrorMessage = "Stage number must be between 1 and 5")]
        public int StageNumber { get; set; } // 1-5 for the 5 stages
        
        public int FieldOrder { get; set; } // Order within the stage
        
        [Required]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Label must be between 1 and 100 characters")]
        public string Label { get; set; } = null!; // Field label shown to user
        
        [Required]
        public string InputType { get; set; } = null!; // Text, TextArea, Number, Dropdown, etc.
        
        public string? FieldOptions { get; set; } // JSON string for dropdown options
        
        [Required]
        [StringLength(1000, MinimumLength = 50, ErrorMessage = "Rationale must be between 50 and 1000 characters")]
        public string Rationale { get; set; } = null!; // AI prompt rationale
        
        public bool IsRequired { get; set; } = false;
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }
        public bool MustBePositive { get; set; } = false;
        public bool MustBeValidUrl { get; set; } = false;
        public bool MustBeBetween0And100 { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}