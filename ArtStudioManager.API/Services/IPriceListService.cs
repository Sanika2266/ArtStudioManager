using ArtStudioManager.API.Models;

namespace ArtStudioManager.API.Services
{
    public interface IPriceListService
    {
        Task<IEnumerable<PriceList>> GetAllAsync();
        Task<IEnumerable<PriceList>> GetByCategoryAsync(int categoryId);
        Task<PriceList?> GetByIdAsync(int id);
        Task<PriceList> CreateAsync(PriceList priceList);
        Task<bool> UpdateAsync(int id, PriceList priceList);
        Task<bool> DeleteAsync(int id);
    }
}