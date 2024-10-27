import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Product } from "../../models/product.model.js";

/**
 * Retrieves all products from the database.
 *
 * @async
 * @function getProducts
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing a list of products if successful; otherwise, returns an error message.
 * @throws {Error} 500 InternalServerError.
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    const message = products.length === 0 ? { message: "No products available" } : products;
    respondWithJson(res, 200, message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
