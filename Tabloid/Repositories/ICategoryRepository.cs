using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        public void AddCategory(Category category);
        public void DeleteCategory(int id);
        public Category GetCategoryById(int id);
    }
}