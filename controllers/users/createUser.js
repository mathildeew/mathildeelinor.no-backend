import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { respondWithJson } from "../../helpers/responseHelpers.js";

/**
 * Creates a new user based on the data provided in the request.
 *
 * @async
 * @function createUser
 * @param {Object} req - Express request object, expecting user data in `req.body`.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing the created user if successful; otherwise, returns an error message.
 * @throws {Error} 500 InternalServerError - For other types of errors.
 */
export const createUser = async (req, res) => {
  try {
    const { emoji, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ emoji, name, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      id: newUser._id,
      emoji: newUser.emoji,
      name: newUser.name,
      token,
    });
  } catch (error) {
    console.error("Feil ved opprettelse av bruker:", error);
    respondWithJson(res, 500, { message: "Intern Server Feil" });
  }
};
