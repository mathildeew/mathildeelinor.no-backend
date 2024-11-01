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

    if (posts.length === 0) {
      return res.status(204).send();
    }
    respondWithJson(res, 200, posts);
  } catch (error) {
    console.error("Error retrieving messages:", error.message);
    res.status(500).json({ message: error.message });
  }
};
