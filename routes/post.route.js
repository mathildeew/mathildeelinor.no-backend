import express from "express";
import mongoose from "mongoose";
import upload from "../config/multerConfig.js";

// Posts
import { getPosts } from "../controllers/posts/getPosts.js";
import { getPost } from "../controllers/posts/getPost.js";
import { createPost } from "../controllers/posts/createPost.js";
import { updatePost } from "../controllers/posts/updatePost.js";
import { deletePost } from "../controllers/posts/deletePost.js";
import { validatePost } from "../middleware/postValidation.js";

// Users
import { createUser } from "../controllers/users/createUser.js";

const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Create new post
router.post("/", upload.single("image"), validatePost, createPost);

// Get single post
router.get("/:id", getPost);

// Update post
router.put("/:id", upload.single("image"), updatePost);

// Delete post
router.delete("/:id", deletePost);

// Create user

// Get all users
// router.get("/users", getUsers);

// Middleware to access gridFSBucket
router.use((req, res, next) => {
  req.gridFSBucket = req.app.locals.gridFSBucket; // Assign gridFSBucket to request
  next();
});

// Get image from GridFS
router.get("/image/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const gridFSBucket = req.gridFSBucket; // Bruk req.gridFSBucket i stedet for gridFSBucket direkte

    // Sjekker om gridFSBucket er riktig initialisert
    if (!gridFSBucket) {
      throw new Error("gridFSBucket is not initialized");
    }

    console.log("File ID:", fileId); // Logger ID-en

    const files = await gridFSBucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
    console.log("Files found:", files); // Logger resultatet

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
