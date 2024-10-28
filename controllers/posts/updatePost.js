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
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return respondWithJson(res, 400, { message: "Invalid post ID" });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });

    if (!updatedPost) {
      return respondWithJson(res, 404, { message: "Melding finnes ikke" });
    }
    respondWithJson(res, 200, updatedPost);
  } catch (error) {
    console.error(error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    respondWithJson(res, statusCode, { message: error || "Intern server feil. Prøv igjen senere." });
  }
};
