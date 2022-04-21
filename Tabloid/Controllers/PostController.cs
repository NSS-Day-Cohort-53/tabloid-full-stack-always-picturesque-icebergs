using Microsoft.AspNetCore.Authorization;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

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

        [HttpGet("comments/{id}")]
        public IActionResult GetWithComments(int id)
        {
            var post = _postRepo.GetPostByIdWithComments(id);
            return Ok(post);
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

        [HttpPost]
        public IActionResult Post(Post post)
        {
            //NOTE: This is only temporary until I merge in the get current user function.
            post.UserProfileId = 1;

            post.CreateDateTime = DateTime.Now;

            post.IsApproved = true;

            if (string.IsNullOrWhiteSpace(post.ImageLocation))
            {
                post.ImageLocation = null;
            }

            _postRepo.Add(post);

            return CreatedAtAction("Get", new { id = post.Id }, post);
        }
    }
}
