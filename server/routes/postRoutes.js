const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth")

const {getPosts, createPosts, updatePost, deletePost, likePost, getPostsBySearch, getPost, createComment} = require("../controllers/postsContr.js");

//Route: "/posts/[route below]"
//Full route with query: "/posts/search?searchQuery=...&tags=..."""

router.get("/search", getPostsBySearch);  


//Route: "/posts/[route below]"
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost); 
router.delete("/:id", auth, deletePost); 
router.patch("/:id/likePost",auth, likePost);
router.post("/:id/createComment", auth, createComment); 


module.exports = router;