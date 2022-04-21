using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllPublishedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content,
                               p.ImageLocation AS HeaderImage,
                               p.CreateDateTime AS PostCreateDateTime,
                               p.PublishDateTime, p.IsApproved,
                               p.CategoryId, p.UserProfileId,

                               u.FirstName, u.LastName, u.DisplayName,
                               u.Email, u.CreateDateTime AS UserCreateDateTime, u.ImageLocation AS AvatarImage,
                               u.UserTypeId,
                           
                               ut.[Name] AS UserTypeName
                          FROM Post p
                               LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                               LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                         WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                      ORDER BY PublishDateTime DESC";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostWithUserFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetAllPostsByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content,
                               p.ImageLocation AS HeaderImage,
                               p.CreateDateTime AS PostCreateDateTime,
                               p.PublishDateTime, p.IsApproved,
                               p.CategoryId, p.UserProfileId
                          FROM Post p
                         WHERE p.Id = @id
                      ORDER BY p.CreateDateTime DESC";
                    DbUtils.AddParameter(cmd,"@id", id);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content,
                               p.ImageLocation AS HeaderImage,
                               p.CreateDateTime AS PostCreateDateTime,
                               p.PublishDateTime, p.IsApproved,
                               p.CategoryId, p.UserProfileId,

                               u.FirstName, u.LastName, u.DisplayName,
                               u.Email, u.CreateDateTime AS UserCreateDateTime, u.ImageLocation AS AvatarImage,
                               u.UserTypeId,
                           
                               ut.[Name] AS UserTypeName
                          FROM Post p
                               LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                               LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                         WHERE p.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);


                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostWithUserFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        /// <summary>
        /// Helper function to retrieve a Post object with User from a reader.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <returns>A Post object found in the data from the Reader</returns>
        private Post NewPostWithUserFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetNullableString(reader, "HeaderImage"),
                CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDateTime"),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                    ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "UserProfileId"),
                        Name = DbUtils.GetString(reader, "UserTypeName")
                    }
                }
            };
        }

        public Post GetPostByIdWithComments(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT p.Title as PostTitle, c.Id as CommentId, c.[Subject], c.Content, c.CreateDateTime, up.DisplayName
                            FROM Post p
                            LEFT JOIN Comment c ON p.Id = c.PostId
                            LEFT JOIN UserProfile up ON c.UserProfileId = up.Id
                            WHERE p.Id = @Id
                            ORDER BY c.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Post post = null;
                        while (reader.Read())
                        {
                            if (post == null)
                            {
                                post = new Post()
                                {
                                    Id = id,
                                    Title = DbUtils.GetString(reader, "PostTitle"),
                                    Comments = new List<Comment>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "CommentId"))
                            {
                                post.Comments.Add(new Comment()
                                {
                                    Id = DbUtils.GetInt(reader, "CommentId"),
                                    Subject = DbUtils.GetString(reader, "Subject"),
                                    Content = DbUtils.GetString(reader, "Content"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                    UserDisplayName = DbUtils.GetString(reader, "DisplayName")
                                });
                            }
                        }

                        return post;
                    }
                }
            }
        /// <summary>
        /// Helper function to retrieve a Post object without User from a reader.
        /// </summary>
        /// <param name="reader">A SqlDataReader that has not exhausted it's result set.</param>
        /// <returns>A Post object found in the data from the Reader</returns>
        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Title = DbUtils.GetString(reader, "Title"),
                Content = DbUtils.GetString(reader, "Content"),
                ImageLocation = DbUtils.GetNullableString(reader, "HeaderImage"),
                CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDateTime"),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
            };
        }
    }

}
