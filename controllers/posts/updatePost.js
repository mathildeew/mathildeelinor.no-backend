import jwt from "jsonwebtoken";
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

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return respondWithJson(res, 401, { message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return respondWithJson(res, 404, { message: "Post not found" });
    }

    if (existingPost.userId.toString() !== userId) {
      return respondWithJson(res, 403, { message: "You do not have permission to update this post" });
    }

    if (req.file) {
      if (existingPost.image) {
        await req.gridFSBucket.delete(existingPost.image);
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        message: req.body.message,
        image: req.file ? req.file.id : existingPost.image,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    respondWithJson(res, 500, { message: "Error updating post", error });
  }
};
