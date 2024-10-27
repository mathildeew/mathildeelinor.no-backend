import mongoose from "mongoose";
import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Product } from "../../models/product.model.js";

/**
 * Updates a product by ID.
 *
 * @param {Object} req - The request object containing the product ID in params and updated data in the body.
 * @param {Object} res - The response object used to send back the status and data.
 * @returns {Promise<void>}
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return respondWithJson(res, 400, { message: "Invalid product ID" });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return respondWithJson(res, 404, { message: "Product not found" });
    }
    respondWithJson(res, 200, product);
  } catch (error) {
    console.error(error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    respondWithJson(res, statusCode, { message: error || "Internal server error. Please try again later." });
  }
};
