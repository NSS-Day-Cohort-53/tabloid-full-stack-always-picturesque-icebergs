using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ICategoryRepository catRepo)
        {
            _categoryRepo = catRepo;
        }

        [HttpGet]
        public IActionResult Getall()
        {
            return Ok(_categoryRepo.GetAll());
        }

        [HttpPost]
        public IActionResult Post (Category category)
        {
            _categoryRepo.AddCategory(category);
            return CreatedAtAction("Post", new { id = category.Id }, category);
        }
    }
}
