import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { respondWithJson } from "../../helpers/responseHelpers.js";

/**
 * User log in.
 *
 * @async
 * @function getLogin
 * @param {Object} req - Express request object containing user data in `req.body`.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing the user ID and token if successful; otherwise, returns an error message.
 * @throws {Error} 401 Unauthorized - If the credentials are invalid.
 * @throws {Error} 500 InternalServerError - For other types of errors.
 */
export const getLogin = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return respondWithJson(res, 401, { message: "Ugyldig brukernavn eller passord" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return respondWithJson(res, 401, { message: "Ugyldig brukernavn eller passord" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, emoji: user.emoji }, // Legg til emoji her
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      id: user._id,
      emoji: user.emoji,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error("Feil ved innlogging:", error);
    respondWithJson(res, 500, { message: "Intern Server Feil" });
  }
};
