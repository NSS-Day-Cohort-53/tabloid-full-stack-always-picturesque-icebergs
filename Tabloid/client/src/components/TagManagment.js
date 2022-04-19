import { getToken } from "../modules/authManager";
const baseUrl = 'api/Tag';



export const addTag = (tag) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag)
  });
};

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