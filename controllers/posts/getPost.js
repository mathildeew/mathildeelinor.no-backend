import mongoose from "mongoose";
import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Post } from "../../models/post.model.js";
Post;

/**
 * Retrieves a single post by its ID from the database.
 *
 * @async
 * @function getPost
 * @param {Object} req - Express request object containing the post ID in params.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing the post if found; otherwise, returns a message indicating the post was not found.
 * @throws {Error} 500 InternalServerError
 */
export const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return respondWithJson(res, 400, { message: "Invalid post ID" });
  }
  try {
    const post = await Post.findById(id);

    if (!post) {
      return respondWithJson(res, 404, { message: "Post finnes ikke" });
    }
    respondWithJson(res, 200, post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Intern Server Feil" });
  }
};
