const PostMessage = require("../models/postModel");
const mongoose = require("mongoose");


const getPosts = async (req,res) => {
    const {page} = req.query;


    try {

        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * 8;
        const total = await PostMessage.countDocuments({});


        const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({
            data:posts, 
            currentPage : Number(page), 
            numberOfPages:Math.ceil(total/LIMIT)
        });

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const getPost = async(req,res) => {
    const {id} = req.params;
    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


const getPostsBySearch = async(req,res) => {

    const {searchQuery,tags} = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');  
        const posts = await PostMessage.find({$or: [{title},{tags: {$in: tags.split(",")}}]});

        res.json({data:posts})
        
    } catch (error) {
        console.log({message: error.message})
        res.status(404).json({message:error.message})
    }
}

const createPosts = async (req,res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, creatorId: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        console.log(error)
        res.status(409).json({message:error.message})
    }
}

const updatePost = async (req,res) => {
    try{
        const {id} = req.params;
        const post = req.body;
    
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that Id.")
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
        res.json(updatedPost);

    } catch(error){
        console.log(error)
        res.status(409).json({message:error.message})

    }
   
}

const deletePost = async (req,res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that Id.");
        await PostMessage.findByIdAndRemove(id);
        res.json({message: "Post deleted successfully"})

    } catch (error) {
        console.log(error)
    }
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message:"Unauthenticated"});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const likeIndex = post.likes.findIndex((id) => id === String(req.userId));

    if(likeIndex < 0) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}

const createComment = async (req,res) => {
    const {id} = req.params;
    const {comment} = req.body;


    try {
        const post = await PostMessage.findById(id);

        post.comments.push(comment); 
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
        

        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({message:error.message})
    }

 
    
}


module.exports = {getPosts, createPosts, updatePost, deletePost, likePost,  getPostsBySearch, getPost, createComment}