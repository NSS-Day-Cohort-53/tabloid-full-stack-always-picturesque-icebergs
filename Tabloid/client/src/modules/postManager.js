import { getToken } from "./authManager";
const baseUrl = "/api/post";

export const getAllPublishedPosts = () => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get posts.");
      }
    });
  });
};

export const getPost = (id) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get posts.");
      }
    });
  });
};

export const getPostWithComments = (id) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/comments/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error getting Post");
      }
    });
  });
};

export const addPost = (post) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unkown error occurred while trying to save a new post.");
            }
        });
    });
};

export const getAllPostsFromCurrentUser = () => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/MyPosts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unkown error occurred whilte trying to get posts.");
      }
    });
  });
};
