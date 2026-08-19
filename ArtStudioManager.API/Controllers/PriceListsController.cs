using Microsoft.AspNetCore.Mvc;
using ArtStudioManager.API.Models;
using ArtStudioManager.API.Services;

namespace ArtStudioManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/pricelists
    public class PriceListsController : ControllerBase
    {
        private readonly IPriceListService _priceListService;

        public PriceListsController(IPriceListService priceListService)
        {
            _priceListService = priceListService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PriceList>>> GetAll()
        {
            return Ok(await _priceListService.GetAllAsync());
        }

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<PriceList>>> GetByCategory(int categoryId)
        {
            return Ok(await _priceListService.GetByCategoryAsync(categoryId));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PriceList>> GetById(int id)
        {
            var priceList = await _priceListService.GetByIdAsync(id);
            if (priceList == null) return NotFound();
            return Ok(priceList);
        }

        [HttpPost]
        public async Task<ActionResult<PriceList>> Create(PriceList priceList)
        {
            var created = await _priceListService.CreateAsync(priceList);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PriceList priceList)
        {
            var success = await _priceListService.UpdateAsync(id, priceList);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _priceListService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}