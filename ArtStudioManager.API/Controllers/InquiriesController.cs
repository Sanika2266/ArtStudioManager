using ArtStudioManager.API.Models;
using ArtStudioManager.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtStudioManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/inquiries
    public class InquiriesController : ControllerBase
    {
        private readonly IInquiryService _inquiryService;

        public InquiriesController(IInquiryService inquiryService)
        {
            _inquiryService = inquiryService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Inquiry>>> GetAll()
        {
            return Ok(await _inquiryService.GetAllAsync());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Inquiry>> GetById(int id)
        {
            var inquiry = await _inquiryService.GetByIdAsync(id);
            if (inquiry == null) return NotFound();
            return Ok(inquiry);
        }

        [HttpPost]
        public async Task<ActionResult<Inquiry>> Create(Inquiry inquiry)
        {
            var created = await _inquiryService.CreateAsync(inquiry);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PATCH is the correct HTTP verb for a partial update (just status), not PUT
        [HttpPatch("{id}/status")]
        [Authorize]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] InquiryStatus status)
        {
            var success = await _inquiryService.UpdateStatusAsync(id, status);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _inquiryService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}