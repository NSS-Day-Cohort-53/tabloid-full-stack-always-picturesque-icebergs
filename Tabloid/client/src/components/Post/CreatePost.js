import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addPost } from "../../modules/postManager";
import { getAllCategories } from "../../modules/CategoryManager";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        publishDateTime: null,
        categoryId: 0
    });
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);

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
        if (copy.imageLocation === "") {
            copy.imageLocation = null;
        }
        addPost(copy)
            .then((newPost) => history.push(`/posts/${newPost.id}`))
            .catch(() => alert("Invalid Post Submission"));
    };

    return (
        <Form onSubmit={savePost}>
            <fieldset>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" name="title" type="text" onChange={handleUserInput} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="categoryId">Category</Label>
                    <Input type="select" id="categoryId" name="categoryId" onChange={handleUserInput} required>
                        <option value="0">Select a Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="publishDateTime">Publish Date</Label> 
                    <Input type="date" id="publishDateTime" name="publishDateTime" onChange={handleUserInput} />
                </FormGroup>
                <FormGroup>
                    <Label for="imageLocation">Header Image Link</Label>
                    <Input type="url" id="imageLocation" name="imageLocation" onChange={handleUserInput} />
                </FormGroup>
                <FormGroup>
                    <Label for="content">Body</Label>
                    <Input type="textarea" id="content" name="content" onChange={handleUserInput} required/>
                </FormGroup>
                <FormGroup>
                    <Button>Save</Button>
                </FormGroup>
            </fieldset>
        </Form>
    )
}

export default CreatePost;