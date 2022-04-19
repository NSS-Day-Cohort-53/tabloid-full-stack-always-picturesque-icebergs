﻿using System.Collections.Generic;
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
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        /// <summary>
        /// Helper function to retrieve a Post object from a reader.
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
                        Name = DbUtils.GetString(reader, "Name")
                    }
                }
            };
        }
    }
}
