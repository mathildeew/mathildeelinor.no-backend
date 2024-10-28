import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Post } from "../../models/post.model.js";

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
  try {
    const post = await Post.create(req.body);
    respondWithJson(res, 201, post);
  } catch (error) {
    if (error.name === "ValidationError") {
      return respondWithJson(res, 400, { message: "Validering mislyktes", errors: error.errors });
    }
    console.error(error);
    respondWithJson(res, 500, { message: "Intern server feil. Prøv igjen senere." });
  }
};
