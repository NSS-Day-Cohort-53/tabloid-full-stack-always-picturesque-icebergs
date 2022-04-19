import { getAllTags } from './TagManagment';
import React, { useEffect, useState  } from 'react';


export const Tags=()=>{
  
       const [tags,setTags]=useState([])

       const getTags = () => {
        getAllTags().then(tags => setTags(tags));
      };
      
      
      useEffect(() => {
        getTags();
      }, []);
    

    return (
        <>
        <div>
            <h2>Tags:</h2>
           {tags.map(t=>
            <h4 id={t.id}> {t.name}</h4> 
            )} 
        </div>
        </>
    )
}


export default Tags