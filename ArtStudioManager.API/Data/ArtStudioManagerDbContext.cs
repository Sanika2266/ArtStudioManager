using Microsoft.EntityFrameworkCore;
using ArtStudioManager.API.Models;

namespace ArtStudioManager.API.Data
{
    public class ArtStudioManagerDbContext : DbContext
    {
        // This constructor lets ASP.NET Core inject configuration (like the connection string)
        public ArtStudioManagerDbContext(DbContextOptions<ArtStudioManagerDbContext> options)
            : base(options)
        {
        }

        // Each DbSet becomes a table
        public DbSet<Category> Categories { get; set; }
        public DbSet<PriceList> PriceLists { get; set; }
        public DbSet<Artwork> Artworks { get; set; }

        // Optional: fine-tune the model here (e.g., decimal precision, unique constraints)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // SQL Server needs explicit precision for decimals, or it warns/truncates
            modelBuilder.Entity<Artwork>()
                .Property(a => a.Price)
                .HasPrecision(10, 2); // e.g. up to 99999999.99

            modelBuilder.Entity<PriceList>()
                .Property(p => p.Price)
                .HasPrecision(10, 2);

            // Category name should be unique (no duplicate "Sketch" categories)
            modelBuilder.Entity<Category>()
                .HasIndex(c => c.Name)
                .IsUnique();
        }
    }
}