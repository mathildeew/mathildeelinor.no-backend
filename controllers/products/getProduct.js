import mongoose from "mongoose";
import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Product } from "../../models/product.model.js";

/**
 * Retrieves a single product by its ID from the database.
 *
 * @async
 * @function getProduct
 * @param {Object} req - Express request object containing the product ID in params.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing the product if found; otherwise, returns a message indicating the product was not found.
 * @throws {Error} 500 InternalServerError
 */
export const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return respondWithJson(res, 400, { message: "Invalid product ID" });
  }
  try {
    const product = await Product.findById(id);

    if (!product) {
      return respondWithJson(res, 404, { message: "Product not found" });
    }
    respondWithJson(res, 200, product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
