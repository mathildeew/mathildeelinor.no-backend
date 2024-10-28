import { respondWithJson } from "../helpers/responseHelpers.js";
import { createPostSchema, updatePostSchema } from "./schemaValidation.js";

export const validatePost = async (req, res, next) => {
  try {
    const schema = req.method === "POST" ? createPostSchema : updatePostSchema;

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return respondWithJson(res, 400, { message: "Validering mislyktes", errors: error.errors });
  }
};
