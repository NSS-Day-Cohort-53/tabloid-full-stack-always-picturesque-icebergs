using Microsoft.AspNetCore.Authorization;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepo;

        public PostController(IPostRepository postRepository)
        {
            _postRepo = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepo.GetAllPublishedPosts());
        }

        [HttpGet("GetWithComments/{id}")]
        public IActionResult GetWithComments(int id)
        {
            var post = _postRepo.GetPostByIdWithComments(id);
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
    }
}
