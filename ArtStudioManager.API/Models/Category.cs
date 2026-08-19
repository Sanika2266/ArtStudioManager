namespace ArtStudioManager.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // e.g. "Sketch", "Blood Sketch"
        public string? Description { get; set; }

        // Navigation properties — one Category has many PriceLists and Artworks
        public ICollection<PriceList> PriceLists { get; set; } = new List<PriceList>();
        public ICollection<Artwork> Artworks { get; set; } = new List<Artwork>();
    }
}
