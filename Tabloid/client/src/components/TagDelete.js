import React, { useEffect, useState  } from 'react';
import {  GetTagById } from '../modules/TagManagment';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { DeleteTags } from '../modules/TagManagment';

export const DeleteTag=()=>
{
    const history = useHistory();

    const [tag,setTags]=useState({})
    const {id} =useParams()
     useEffect(() => {
    GetTagById(id).then((tag)=>{
        setTags(tag)
    });
  }, []);


    const DeleteButton=(evt)=>{
        
        evt.preventDefault();
       
        DeleteTags(id).then((tag)=>{
            setTags(tag)
            history.push("/tag");
        })

        
          
           
      
       
          
       

    }
    
    
    
    return (
        <>
        <h2>Delete a tag</h2>
        <h3>Are you sure you want to delete?</h3>
        
        <h3  key={tag?.id}>{tag?.name}</h3>
        <button onClick={DeleteButton}> delete</button>
        <Link to="/tag">Cancel</Link>
        </>
    )
}