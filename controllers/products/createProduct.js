import { productSchemaValidation } from "../../middleware/schemaValidation.js";
import { respondWithJson } from "../../helpers/responseHelpers.js";
import { Product } from "../../models/product.model.js";

/**
 * Creates a new product based on the data provided in the request.
 *
 * @async
 * @function createProduct
 * @param {Object} req - Express request object, expecting product data in `req.body`.
 * @param {Object} res - Express response object, returns a JSON response.
 * @returns {Promise<void>} Responds with JSON containing the created product if successful; otherwise, returns an error message.
 * @throws {Error} 400 ValidationError - If the product data validation fails.
 * @throws {Error} 500 InternalServerError - For other types of errors.
 */
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    respondWithJson(res, 201, product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return respondWithJson(res, 400, { message: "Validation failed", errors: error.errors });
    }
    console.error(error);
    respondWithJson(res, 500, { message: "Internal server error. Please try again later." });
  }
};
