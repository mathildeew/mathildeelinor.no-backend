import mongoose from "mongoose";
import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Product } from "../../models/product.model.js";

/**
 * Deletes a product by ID.
 *
 * @param {Object} req - The request object containing the product ID in params.
 * @param {Object} res - The response object used to send back the status and message.
 * @returns {Promise<void>}
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return respondWithJson(res, 400, { message: "Invalid product ID" });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return respondWithJson(res, 404, { message: "Product not found" });
    }
    respondWithJson(res, 200, { message: `Product with id: ${id} was successfully deleted` });
  } catch (error) {
    console.error("Error deleting product:", error);
    respondWithJson(res, 500, { message: "Internal Server Error" });
  }
};
