import express from "express";
import mongoose from "mongoose";
import upload from "../config/multerConfig.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

// Posts controllers
import { getPosts } from "../controllers/posts/getPosts.js";
import { getPost } from "../controllers/posts/getPost.js";
import { createPost } from "../controllers/posts/createPost.js";
import { updatePost } from "../controllers/posts/updatePost.js";
import { deletePost } from "../controllers/posts/deletePost.js";
import { validatePost } from "../middleware/postValidation.js";

// Users controllers
import { createUser } from "../controllers/users/createUser.js";
import { getLogin } from "../controllers/users/getLogin.js";

const router = express.Router();

// Post
router.get("/messages", getPosts); // Get all posts
router.post("/messages", upload.single("image"), validatePost, createPost); // Create post
router.get("/messages/:id", getPost); // Get single post by id
router.put("/messages/:id", upload.single("image"), validatePost, updatePost); // Update post by id
router.delete("/messages/:id", deletePost); // Delete post by id

// User
router.post("/login", getLogin); // User login
router.post("/users", createUser); // Create user

// Protected route
router.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Middleware to access gridFSBucket
router.use((req, res, next) => {
  req.gridFSBucket = req.app.locals.gridFSBucket;
  next();
});

// Get image from GridFS
router.get("/messages/image/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const gridFSBucket = req.gridFSBucket;

    if (!gridFSBucket) {
      throw new Error("gridFSBucket is not initialized");
    }

    const files = await gridFSBucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const readStream = gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ message: "Error retrieving image" });
  }
});

export default router;
