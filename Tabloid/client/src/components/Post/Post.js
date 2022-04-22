import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post, hasTitleLink }) => {
  return (
    <Card>
      {post.imageLocation ? (
        <img src={post.imageLocation} alt={post.Title} />
      ) : null}
      <CardTitle>
        {hasTitleLink ? (
          <Link className="text-left px-2" to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        ) : (
          post.title
        )}
      </CardTitle>
      <CardBody>
        <p className="text-left px-2">{post.content}</p>
        <p className="text-right px-2">Published on: {post.publishDateTime}</p>
        <Link className="text-left px-2" to={`/posts/edit/${post.id}`}>Edit</Link>
      </CardBody>
    </Card>
  );
};

export default Post;
