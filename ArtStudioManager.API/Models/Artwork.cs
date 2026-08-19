namespace ArtStudioManager.API.Models
{
    public class Artwork
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public decimal Price { get; set; }
        public string? Dimensions { get; set; }   // e.g. "12x16 inches"
        public string? Medium { get; set; }        // e.g. "Pencil", "Charcoal"
        public bool IsAvailable { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign key
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
