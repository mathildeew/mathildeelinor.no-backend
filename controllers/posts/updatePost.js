import mongoose from "mongoose";
import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Post } from "../../models/post.model.js";
/**
 * Updates a post by ID.
 *
 * @param {Object} req - The request object containing the post ID in params and updated data in the body.
 * @param {Object} res - The response object used to send back the status and data.
 * @returns {Promise<void>}
 */
export const updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    // Først, hvis et nytt bilde er lastet opp, slett det gamle bildet
    if (req.file) {
      // Hent det gamle innlegget fra databasen
      const existingPost = await Post.findById(postId);
      if (existingPost && existingPost.image) {
        // Slett det gamle bildet fra GridFS
        await req.gridFSBucket.delete(existingPost.image); // Bruk gridFSBucket fra req
      }
    }

    // Oppdater innlegget i databasen
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        message: req.body.message,
        image: req.file ? req.file.id : existingPost.image, // Bruk id til nytt bilde eller behold det gamle
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};
