import React, { useEffect, useState } from "react";
import { addPost } from "../../modules/postManager";
import { getAllCategories } from "../../modules/CategoryManager";

const CreatePost = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        publishDateTime: "",
        categoryId: ""
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);
    
}