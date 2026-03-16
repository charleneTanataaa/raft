import { api } from "./axios";

export const getPosts = async () => {
    const res = await api.get("/posts");
    return res.data;
}

export const getPostById = async (id) =>{
    const res = await api.get(`/posts/${id}`);
    return res.data;
}

export const createPost = async(title, content) => {
    const res = await api.post(`/posts`, {title, content});
    return res.data;
}