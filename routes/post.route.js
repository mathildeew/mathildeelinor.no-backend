import express from "express";
import { getPosts } from "../controllers/posts/getPosts.js";
import { getPost } from "../controllers/posts/getPost.js";
import { createPost } from "../controllers/posts/createPost.js";
import { updatePost } from "../controllers/posts/updatePost.js";
import { deletePost } from "../controllers/posts/deletePost.js";
import { validatePost } from "../middleware/postValidation.js";

const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Create new post
router.post("/", validatePost, createPost);

// Get single post
router.get("/:id", getPost);

// Update post
router.put("/:id", updatePost);

// Delete post
router.delete("/:id", deletePost);

export default router;
