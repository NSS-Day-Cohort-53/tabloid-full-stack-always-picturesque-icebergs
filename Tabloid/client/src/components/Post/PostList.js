import React, { useEffect, useState } from "react";
import Post from './Post';
import { getAllPublishedPosts } from "../../modules/postManager";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPublishedPosts().then(posts => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <h2>Feed</h2>
            <div className="container">
                {posts.map(p => <Post post={p} key={p.id} />)}
            </div>
        </>
    )
}

export default PostList;