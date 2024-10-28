import mongoose from "mongoose";
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
    return respondWithJson(res, 400, { message: "Invalid post ID" });
  }

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return respondWithJson(res, 404, { message: "Post finnes ikke" });
    }
    respondWithJson(res, 200, { message: `Post med id: ${id} er nå slettet` });
  } catch (error) {
    console.error("Feil ved sletting av post:", error);
    respondWithJson(res, 500, { message: "Intern Server Feil" });
  }
};
