using Microsoft.EntityFrameworkCore;
using ArtStudioManager.API.Data;
using ArtStudioManager.API.Models;

namespace ArtStudioManager.API.Services
{
    public class PriceListService : IPriceListService
    {
        private readonly ArtStudioManagerDbContext _context;

        public PriceListService(ArtStudioManagerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PriceList>> GetAllAsync()
        {
            return await _context.PriceLists
                .Include(p => p.Category)
                .ToListAsync();
        }

        public async Task<IEnumerable<PriceList>> GetByCategoryAsync(int categoryId)
        {
            return await _context.PriceLists
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<PriceList?> GetByIdAsync(int id)
        {
            return await _context.PriceLists
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<PriceList> CreateAsync(PriceList priceList)
        {
            _context.PriceLists.Add(priceList);
            await _context.SaveChangesAsync();
            return priceList;
        }

        public async Task<bool> UpdateAsync(int id, PriceList priceList)
        {
            var existing = await _context.PriceLists.FindAsync(id);
            if (existing == null) return false;

            existing.Size = priceList.Size;
            existing.Price = priceList.Price;
            existing.CategoryId = priceList.CategoryId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.PriceLists.FindAsync(id);
            if (existing == null) return false;

            _context.PriceLists.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}