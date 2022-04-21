import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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

    const handleUserInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const copy = {...post};
        copy[name] = value;
        setPost(copy);
    }

    return (
        <Form>
            <fieldset>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" name="title" type="text" onChange={handleUserInput} />
                </FormGroup>
                <FormGroup>
                    <Label for="categoryId">Category</Label>
                    <Input type="select" id="categoryId" name="categoryId" onChange={handleUserInput}>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Input>
                </FormGroup>
            </fieldset>
        </Form>
    )
}

export default CreatePost;