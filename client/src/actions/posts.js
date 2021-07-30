
import * as api from '../api';
import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, LIKE, START_LOADING, UPDATE, COMMENT } from '../constants/actionTypes';

// INFO: const url = "http://localhost:5000/posts";
//export const fetchPosts = () => axios.get(url);

 
//Action Creators 
export const getPosts = (page) => async (dispatch) => {
    try {

        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page); 
        // console.log(data);
        //# data => {data: [{POST1},{POST2}], currentPage, numberOfPAges}

        dispatch({
            type:FETCH_ALL,
            payload: data
        })

        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error.message)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id); 
        // console.log(data); 

        dispatch({
            type:FETCH_POST,
            payload: data
        })

        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
        //# searchQuery = {search, tags} 
    try {
        

        dispatch({type: START_LOADING});
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery)
        
      //# data => [{name, title, message,...etc}, {}]
        
        dispatch({type: FETCH_BY_SEARCH, payload: {data}})

        dispatch({type: END_LOADING});
    
    } catch (error) {
        console.log(error)
    }
}


export const createPost = (newPost, history) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(newPost)
        history.push(`/posts/${data._id}`);

        dispatch({
            type:CREATE,
            payload: data 
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id,post) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({
            type:UPDATE,
            payload: data
        })  
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({
            type:DELETE,
            payload : id
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: LIKE, payload: data });

    } catch (error) {
      console.log(error.message); 
    }
  };

  export const createComment = (comment,id) => async (dispatch) => {
    try { 
       const {data} = await api.createComment(comment,id);
       //# data => {comments, _id, title, message, name,...etc}

       dispatch({type:COMMENT, payload:data});
       return data.comments;

    } catch (error) {
        console.log(error.message)
    }
  }