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
    return respondWithJson(res, 400, { message: "Invalid post ID" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return respondWithJson(res, 401, { message: "Uautorisert tilgang" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const post = await Post.findById(id);
    if (!post) {
      return respondWithJson(res, 404, { message: "Post finnes ikke" });
    }

    if (post.userId.toString() !== userId) {
      return respondWithJson(res, 403, { message: "Du har ikke tilgang til å slette denne posten" });
    }

    await Post.findByIdAndDelete(id);
    respondWithJson(res, 200, { message: `Post med id: ${id} er nå slettet` });
  } catch (error) {
    console.error("Feil ved sletting av post:", error);
    respondWithJson(res, 500, { message: "Intern Server Feil" });
  }
};
