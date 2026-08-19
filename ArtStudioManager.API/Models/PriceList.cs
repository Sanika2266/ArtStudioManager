namespace ArtStudioManager.API.Models
{
    public enum SizeType
    {
        A4,
        A3
    }
    public class PriceList
    {
        public int Id { get; set; }
        public SizeType Size { get; set; }
        public decimal Price { get; set; }

        // Foreign key
        public int CategoryId { get; set; }
        // Navigation property back to the parent
        public Category? Category { get; set; }
    }
}
