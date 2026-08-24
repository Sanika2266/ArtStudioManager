using Microsoft.EntityFrameworkCore;
using ArtStudioManager.API.Data;
using ArtStudioManager.API.Models;

namespace ArtStudioManager.API.Services
{
    public class InquiryService : IInquiryService
    {
        private readonly ArtStudioManagerDbContext _context;

        public InquiryService(ArtStudioManagerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Inquiry>> GetAllAsync()
        {
            return await _context.Inquiries
                .OrderByDescending(i => i.CreatedAt) // newest first
                .ToListAsync();
        }

        public async Task<Inquiry?> GetByIdAsync(int id)
        {
            return await _context.Inquiries.FindAsync(id);
        }

        public async Task<Inquiry> CreateAsync(Inquiry inquiry)
        {
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();
            return inquiry;
        }

        public async Task<bool> UpdateStatusAsync(int id, InquiryStatus status)
        {
            var existing = await _context.Inquiries.FindAsync(id);
            if (existing == null) return false;

            existing.Status = status;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.Inquiries.FindAsync(id);
            if (existing == null) return false;

            _context.Inquiries.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}