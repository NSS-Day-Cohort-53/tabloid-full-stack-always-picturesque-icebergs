import React, { useEffect, useState  } from 'react';
import {  GetTagById } from '../modules/TagManagment';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { DeleteTags } from '../modules/TagManagment';

export const DeleteTag=()=>
{
    

    const [tag,setTags]=useState({})
    const {id} =useParams()
     useEffect(() => {
    GetTagById(id).then((tag)=>{
        setTags(tag)
    });
  }, []);

  if (!tag) {
    return null;
  }
    
    
    
    
    return (
        <>
        <h2>Delete a tag</h2>
        <h3>Are you sure you want to delete?</h3>
        <h1>{tag.id}</h1>
        <h3>{tag.name}</h3>
        <button> delete</button>
        </>
    )
}