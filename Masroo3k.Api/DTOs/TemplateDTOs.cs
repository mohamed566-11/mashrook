using System.ComponentModel.DataAnnotations;

namespace Masroo3k.Api.DTOs
{
    public class TemplateDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Category { get; set; } = null!;
        public int Duration { get; set; }
        public bool IsPopular { get; set; }
        public DateTime CreatedAt { get; set; }
        public int FieldsCount { get; set; }
        public List<TemplateFieldDto>? Fields { get; set; }
    }

    public class CreateTemplateRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 5, ErrorMessage = "Name must be between 5 and 100 characters")]
        public string Name { get; set; } = null!;

        [StringLength(280, MinimumLength = 20, ErrorMessage = "Description must be between 20 and 280 characters")]
        public string? Description { get; set; }

        [Required]
        public string Category { get; set; } = null!;

        [Required]
        [Range(1, 120, ErrorMessage = "Duration must be between 1 and 120 minutes")]
        public int Duration { get; set; }

        public bool IsPopular { get; set; }
    }

    public class UpdateTemplateRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 5, ErrorMessage = "Name must be between 5 and 100 characters")]
        public string Name { get; set; } = null!;

        [StringLength(280, MinimumLength = 20, ErrorMessage = "Description must be between 20 and 280 characters")]
        public string? Description { get; set; }

        [Required]
        public string Category { get; set; } = null!;

        [Required]
        [Range(1, 120, ErrorMessage = "Duration must be between 1 and 120 minutes")]
        public int Duration { get; set; }

        public bool IsPopular { get; set; }
    }
}