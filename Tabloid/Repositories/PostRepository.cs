﻿using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllPublishedPosts()
        {
            using (var cmd = Connection.CreateCommand())
            {
                cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content,
                           p.ImageLocation AS HeaderImage,
                           p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                           p.CategoryId, p.UserProfileId

                           u.FirstName, u.LastName, u.DisplayName,
                           u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                           u.UserTypeId,
                           
                           ut.[Name] AS UserTypeName
                      FROM Post p
                           LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                           LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                     WHERE IsApproved = True AND PublishDateTime < SYSDATETIME()";
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

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = DbUtils.GetNullableString(reader, "HeaderImage"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }
    }
}
