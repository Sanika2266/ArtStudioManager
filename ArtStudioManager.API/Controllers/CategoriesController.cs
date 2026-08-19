using Microsoft.AspNetCore.Mvc;
using ArtStudioManager.API.Models;
using ArtStudioManager.API.Services;

namespace ArtStudioManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // becomes: api/categories
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAll()
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(categories);
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetById(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            if (category == null) return NotFound();
            return Ok(category);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Category>> Create(Category category)
        {
            var created = await _categoryService.CreateAsync(category);
            // Returns 201 Created + a Location header pointing to GET api/categories/{id}
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Category category)
        {
            var success = await _categoryService.UpdateAsync(id, category);
            if (!success) return NotFound();
            return NoContent(); // 204 - success, nothing to return
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _categoryService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}