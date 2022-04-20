import React, { useEffect, useState } from "react";
import Post from './Post';
import { getAllPostsFromCurrentUser } from "../../modules/postManager";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPostsFromCurrentUser().then(posts => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <h2 className="text-center"><strong>My Posts</strong></h2>
            <div className="container">
                {posts.map(p => <Post post={p} hasTitleLink={true} key={p.id} />)}
            </div>
        </>
    )
}

export default MyPosts;