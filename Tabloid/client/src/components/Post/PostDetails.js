import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { getPost } from "../../modules/postManager";

const PostDetails = () => {
    const [post, setPost] = useState();
    const { id } = useParams();

    useEffect(() => {
        getPost(id).then(post => setPost(post));
    }, [id]);

    if (!post) {
        return null;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <Post post={post} />
                    <ListGroup>
                        {/* TODO - Comments will be listed here on a future ticket */}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default PostDetails;