import { getToken } from "./authManager";
const baseUrl = '/api/Tag';


export const addTag=(tag)=>
{
  return getToken().then((token)=>{
return fetch(baseUrl, {
      method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
     },
     body: JSON.stringify(tag),
   })

  })

}


export const getAllTags = () => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get the tags.");
      }
    });
  });
};

export const DeleteTag=()=>
{
    return getToken().then((token)=>
    {
      return fetch (baseUrl,
      {
        method:"Delete",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp=>{
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An unknown error occurred while trying to get the tags.");
        }

      })

    })
  

}

export const GetTagById=(id)=>
{
  return getToken().then((token)=>
  {
    return fetch(`${baseUrl}/${id}`,{

      method:"GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp=>{
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An unknown error occurred while trying to get the tags.");
        }
    })
    

  })

}