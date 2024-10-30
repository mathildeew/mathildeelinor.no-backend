import { Post } from "../../models/post.model.js";
import { respondWithJson } from "../../helpers/responseHelpers.js";

/**
 * Creates a new user based on the data provided in the request.
 *
 * @async
 * @function createUser
 * @param {Object} req - Express request object, expecting user data in `req.body`.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing the created user if successful; otherwise, returns an error message.
 * @throws {Error} 400 ValidationError - If the user data validation fails.
 * @throws {Error} 500 InternalServerError - For other types of errors.
 */
export const createUser = async (req, res) => {
  // console.log(req.file);
  try {
    const newUser = new User({
      emoji: req.body.emoji,
      name: req.body.name,
      password: req.body.password,
    });

    console.log(req.file);

    const savedUser = await newUser.save();
    respondWithJson(res, 201, savedUser);
  } catch (error) {
    console.error("Feil ved opprettelse av bruker:", error);
    respondWithJson(res, 500, { message: "Intern Server Feil" });
  }
};
