import { respondWithJson } from "../helpers/responseHelpers.js";
import { productSchemaValidation } from "./schemaValidation.js";

export const validateProduct = async (req, res, next) => {
  try {
    await productSchemaValidation.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return respondWithJson(res, 400, { message: "Validation failed", errors: error.errors });
  }
};
