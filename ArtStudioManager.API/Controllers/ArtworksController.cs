using Microsoft.AspNetCore.Mvc;
using ArtStudioManager.API.Models;
using ArtStudioManager.API.Services;

namespace ArtStudioManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/artworks
    public class ArtworksController : ControllerBase
    {
        private readonly IArtworkService _artworkService;

        public ArtworksController(IArtworkService artworkService)
        {
            _artworkService = artworkService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetAll()
        {
            return Ok(await _artworkService.GetAllAsync());
        }

        // GET: api/artworks/category/2
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetByCategory(int categoryId)
        {
            return Ok(await _artworkService.GetByCategoryAsync(categoryId));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artwork>> GetById(int id)
        {
            var artwork = await _artworkService.GetByIdAsync(id);
            if (artwork == null) return NotFound();
            return Ok(artwork);
        }

        [HttpPost]
        public async Task<ActionResult<Artwork>> Create(Artwork artwork)
        {
            var created = await _artworkService.CreateAsync(artwork);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Artwork artwork)
        {
            var success = await _artworkService.UpdateAsync(id, artwork);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _artworkService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}