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
  // console.log(req.file);
  try {
    const newPost = new Post({
      name: req.body.name,
      message: req.body.message,
      image: req.file.id, // Lagre ID-en til bildet i databasen
    });

    console.log(req.file);

    const savedPost = await newPost.save(); // Lagre innlegget i databasen
    respondWithJson(res, 201, savedPost); // Send tilbake det lagrede innlegget som respons
  } catch (error) {
    console.error("Feil ved oppretting av innlegg:", error);
    respondWithJson(res, 500, { message: "Intern Server Feil" });
  }
};
