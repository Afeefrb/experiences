import axios from 'axios';


//server route --> server/ > routes/ > posts.js

// const url = "https://experiences-reactjs.herokuapp.com/";

// const url = "http://localhost:5000/"

const API = axios.create({baseURL:"https://experiences-reactjs.herokuapp.com/"})

//We need to add token to each and every request and send it to backend
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        
    }
    return req;
})


// Backend API: "/posts"
export const fetchPosts = (page) => API.get(`/posts?page=${page}`); 
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) => {
   return API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);   

}
//# searchQuery = {search, tags}

export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`,updatedPost);  
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const createComment = (comment,id) => API.post
(`/posts/${id}/createComment`, {comment});

// Backend API: "/user"

export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);