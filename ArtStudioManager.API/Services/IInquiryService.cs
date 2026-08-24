using ArtStudioManager.API.Models;

namespace ArtStudioManager.API.Services
{
    public interface IInquiryService
    {
        Task<IEnumerable<Inquiry>> GetAllAsync();
        Task<Inquiry?> GetByIdAsync(int id);
        Task<Inquiry> CreateAsync(Inquiry inquiry);
        Task<bool> UpdateStatusAsync(int id, InquiryStatus status);
        Task<bool> DeleteAsync(int id);
    }
}