using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPublishedPosts();
        Post GetPostByIdWithComments(int id);
        Post GetById(int id);
        void Add(Post post);
    }
}