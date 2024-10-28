import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Post } from "../../models/post.model.js";

/**
 * Retrieves all posts from the database.
 *
 * @async
 * @function getPosts
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing a list of posts if successful; otherwise, returns an error message.
 * @throws {Error} 500 InternalServerError.
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    const message = posts.length === 0 ? { message: "No posts available" } : posts;
    respondWithJson(res, 200, message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
