using Microsoft.EntityFrameworkCore;
using ArtStudioManager.API.Data;
using ArtStudioManager.API.Models;

namespace ArtStudioManager.API.Services
{
    public class ArtworkService : IArtworkService
    {
        private readonly ArtStudioManagerDbContext _context;

        public ArtworkService(ArtStudioManagerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Artwork>> GetAllAsync()
        {
            return await _context.Artworks
                .Include(a => a.Category)
                .ToListAsync();
        }

        public async Task<IEnumerable<Artwork>> GetByCategoryAsync(int categoryId)
        {
            return await _context.Artworks
                .Include(a => a.Category)
                .Where(a => a.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<Artwork?> GetByIdAsync(int id)
        {
            return await _context.Artworks
                .Include(a => a.Category)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Artwork> CreateAsync(Artwork artwork)
        {
            _context.Artworks.Add(artwork);
            await _context.SaveChangesAsync();
            return artwork;
        }

        public async Task<bool> UpdateAsync(int id, Artwork artwork)
        {
            var existing = await _context.Artworks.FindAsync(id);
            if (existing == null) return false;

            existing.Title = artwork.Title;
            existing.Description = artwork.Description;
            existing.ImageUrl = artwork.ImageUrl;
            existing.Price = artwork.Price;
            existing.Dimensions = artwork.Dimensions;
            existing.Medium = artwork.Medium;
            existing.IsAvailable = artwork.IsAvailable;
            existing.CategoryId = artwork.CategoryId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.Artworks.FindAsync(id);
            if (existing == null) return false;

            _context.Artworks.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}