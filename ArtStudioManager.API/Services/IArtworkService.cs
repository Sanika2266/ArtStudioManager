using ArtStudioManager.API.Models;

namespace ArtStudioManager.API.Services
{
    public interface IArtworkService
    {
        Task<IEnumerable<Artwork>> GetAllAsync();
        Task<IEnumerable<Artwork>> GetByCategoryAsync(int categoryId);
        Task<Artwork?> GetByIdAsync(int id);
        Task<Artwork> CreateAsync(Artwork artwork);
        Task<bool> UpdateAsync(int id, Artwork artwork);
        Task<bool> DeleteAsync(int id);
    }
}