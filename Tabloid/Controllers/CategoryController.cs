using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
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
    }
}
