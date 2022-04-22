import { getAllTags } from '../modules/TagManagment';
import React, { useEffect, useState  } from 'react';

import { Link } from 'react-router-dom';


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
           {tags?.map(t=>
            <><h4 key={t.id}> {t.name}</h4><Link to={`/tag/delete/${t.id}`}> Delete</Link></>

            
            )
            
            }  
            <div>
          <Link to="/tag/new">Create a tag</Link>
          </div>
        </div>
        </>


    )
}


export default Tags