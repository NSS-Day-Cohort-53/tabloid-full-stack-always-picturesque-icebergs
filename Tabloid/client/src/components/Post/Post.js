import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    return (
        <Card>
            {post.imageLocation ? <img src={post.imageLocation} alt={post.Title}/> : null}
            <CardBody>
                <Link className="text-left px-2" /*TODO have to property link to post details when working on relevant ticket*/>{post.title}</Link>
                {post.Content}
                <p className="text-right px-2">Published on: {post.publishDateTime}</p>
            </CardBody>
        </Card>
    );
};

export default Post;