namespace ArtStudioManager.API.Models
{
    public enum InquiryStatus
    {
        New,
        InProgress,
        Completed
    }

    public class Inquiry
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? ArtworkType { get; set; }      // free-text, e.g. "Portrait", "Pet sketch"
        public string? PreferredSize { get; set; }     // free-text, e.g. "A4", "Custom"
        public string? Description { get; set; }
        public string? ReferenceImageUrl { get; set; } // reuses our existing /api/upload endpoint
        public string Message { get; set; } = string.Empty;
        public InquiryStatus Status { get; set; } = InquiryStatus.New;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}