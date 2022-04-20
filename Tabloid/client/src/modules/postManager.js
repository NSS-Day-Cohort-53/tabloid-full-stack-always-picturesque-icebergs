import { getToken } from "./authManager";
const baseUrl = '/api/post';

export const getAllPublishedPosts = () => {
    return getToken().then(token => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get posts.");
            }
        });
    });
};

export const getPost = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get posts.");
            }
        });
    });
};

export const getAllPostsFromCurrentUser = () => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/GetPostsByCurrentUser`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unkown erro occurred whilte trying to get posts.");
            }
        });
    });
};