﻿using System;

namespace Tabloid.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserProfileId { get; set; }
        public int PostId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
