import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Post } from "../../models/post.model.js";

/**
 * Deletes a post by ID.
 *
 * @param {Object} req - The request object containing the post ID in params.
 * @param {Object} res - The response object used to send back the status and message.
 * @returns {Promise<void>}
 */
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return respondWithJson(res, 400, { message: "Invalid message id" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return respondWithJson(res, 401, { message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const post = await Post.findById(id);
    if (!post) {
      return respondWithJson(res, 404, { message: "The message does not exist" });
    }

    if (post.userId.toString() !== userId) {
      return respondWithJson(res, 403, { message: "You do not have access to delete this message" });
    }

    await Post.findByIdAndDelete(id);
    console.log(`Post with ID: ${id} has been deleted by user: ${userId}`);
    respondWithJson(res, 200, { message: `Post with id: ${id} has now been deleted` });
  } catch (error) {
    console.error("Error when deleting message:", error);
    respondWithJson(res, 500, { message: "Internal Server Error" });
  }
};
