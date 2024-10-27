import { respondWithJson } from "../helpers/responseHelpers.js";
import { createProductSchema, updateProductSchema } from "./schemaValidation.js";

export const validateProduct = async (req, res, next) => {
  try {
    const schema = req.method === "POST" ? createProductSchema : updateProductSchema;

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return respondWithJson(res, 400, { message: "Validation failed", errors: error.errors });
  }
};
