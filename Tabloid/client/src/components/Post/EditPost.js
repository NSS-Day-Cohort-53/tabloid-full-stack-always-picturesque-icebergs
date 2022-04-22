import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updatePost, getPost } from "../../modules/postManager";
import { getAllCategories } from "../../modules/CategoryManager";
import { useHistory, useParams, Link } from "react-router-dom";

const EditPost = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        publishDateTime: "",
        categoryId: 0
    });
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

    useEffect(() => {
        getPost(id).then(post => {
            if (post.imageLocation === null) {
                post.imageLocation = "";
            }
            //convert date time string to what we use
            post.publishDateTime = post.publishDateTime.split('T')[0];
            setPost(post);
        });
    }, [id]);

    const handleUserInput = (event) => {
        const target = event.target;
        let value = target.value;
        const name = target.name;
        const copy = {...post};
        //convert categoryId to an int
        if (name === "categoryId") {
            value = parseInt(value);
        }
        copy[name] = value;
        setPost(copy);
    };

    const savePost = (event) => {
        event.preventDefault();
        const copy = {...post};
        //handle nullable/required properties
        if (copy.categoryId === 0) {
            window.alert("Please select a category.")
        }
        if (copy.publishDateTime === "") {
            copy.imageLocation = null;
        }
        updatePost(copy)
            .then((newPost) => history.push(`/posts/${newPost.id}`))
            .catch(() => alert("Invalid Post Submission"));
    };

    return (
        <Form onSubmit={savePost}>
            <fieldset>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" name="title" type="text" onChange={handleUserInput} value={post.title} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="categoryId">Category</Label>
                    <Input type="select" id="categoryId" name="categoryId" onChange={handleUserInput} value={post.categoryId} required>
                        <option value="0">Select a Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="publishDateTime">Publish Date</Label> 
                    <Input type="date" id="publishDateTime" name="publishDateTime" onChange={handleUserInput} value={post.publishDateTime} />
                </FormGroup>
                <FormGroup>
                    <Label for="imageLocation">Header Image Link</Label>
                    <Input type="url" id="imageLocation" name="imageLocation" onChange={handleUserInput} value={post.imageLocation ? post.imageLocation : ""} />
                </FormGroup>
                <FormGroup>
                    <Label for="content">Body</Label>
                    <Input type="textarea" id="content" name="content" onChange={handleUserInput} value={post.content} required/>
                </FormGroup>
                <FormGroup>
                    <Button>Save</Button>
                    <Link to="/MyPosts">Cancel</Link>
                </FormGroup>
            </fieldset>
        </Form>
    )
}

export default EditPost;