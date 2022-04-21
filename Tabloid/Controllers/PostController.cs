using Microsoft.AspNetCore.Authorization;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepo;
        private readonly IUserProfileRepository _userProfileRepo;

        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepo = postRepository;
            _userProfileRepo = userProfileRepository;
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

        [HttpGet("PostsByUser/{id}")]
        public IActionResult GetPostsByUser(int id)
        {
            return Ok(_postRepo.GetAllPostsByUser(id));
        }

        [HttpGet("MyPosts")]
        public IActionResult GetPostsByCurrentUser()
        {
            var profile = GetCurrentUserProfile();
            if (profile == null)
            { 
                return NotFound();
            }
            return Ok(_postRepo.GetAllPostsByUser(profile.Id));
        }

        //Function for grabbing the current user for use in certain end points
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
