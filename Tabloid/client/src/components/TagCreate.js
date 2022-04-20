import React, { useEffect, useState  } from 'react';
import { Form } from 'reactstrap';
import { addTag } from '../modules/TagManagment';
import Tags from './TagView';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const CreateTag=()=>{
    const history = useHistory();
    const TagForm={
        Name:''
    }
    const [tag, setTag] = useState(TagForm);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const tagCopy = { ...tag };
        tagCopy[key] = value;
        setTag(tagCopy);

        
    
    };
    const handleSave = (evt) => {
        evt.preventDefault();
       
        addTag(tag).then(() => {
            // Navigate the user back to the home route
            history.push("/Tags");
        });
    }
    
return (

    
    <>
    <form>
    <h4>create a tag</h4>
    <input type="text" name="name" id="Name" onChange={handleInputChange}></input>
    <button type="submit" value="Submit"  onClick={handleSave}>Submit</button>
    
    </form>
    <Link to="/Tags">head back</Link>

    </>
)


}
