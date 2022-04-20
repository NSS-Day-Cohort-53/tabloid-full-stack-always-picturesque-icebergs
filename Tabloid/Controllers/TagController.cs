﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult GetTags()
        {
            return Ok(_tagRepository.GetAllTags());
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagRepository.Add(tag);
            return CreatedAtAction("Post", new { id = tag.Id }, tag);

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository.getTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }
    }
}
