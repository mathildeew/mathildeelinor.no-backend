import jwt from "jsonwebtoken";
import { Post } from "../../models/post.model.js";
import { respondWithJson } from "../../helpers/responseHelpers.js";

/**
 * Creates a new post based on the data provided in the request.
 *
 * @async
 * @function createPost
 * @param {Object} req - Express request object, expecting post data in `req.body`.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing the created post if successful; otherwise, returns an error message.
 * @throws {Error} 400 ValidationError - If the post data validation fails.
 * @throws {Error} 500 InternalServerError - For other types of errors.
 */
export const createPost = async (req, res) => {
  const { message } = req.body; // Bare få tak i melding fra body
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return respondWithJson(res, 401, { message: "Unauthorized access" });
  }

  if (!message || message.trim().length === 0) {
    return respondWithJson(res, 400, { message: "Message cannot be empty" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const image = req.file ? req.file.id : null;

    const newPost = new Post({
      message,
      user: {
        userId,
        name: decoded.name,
        emoji: decoded.emoji,
      },
      image,
    });

    await newPost.save();
    respondWithJson(res, 201, { message: "Message sent!", post: newPost });
  } catch (error) {
    console.error("Error when creating message:", error);
    respondWithJson(res, 500, { message: "Internal Server Error" });
  }
};
