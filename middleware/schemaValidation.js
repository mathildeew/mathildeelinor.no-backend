import * as Yup from "yup";

export const createPostSchema = Yup.object().shape({
  message: Yup.string().min(5, "Message must be over 5 characters").max(500, "The message cannot exceed 500 characters").required("You must include a message"),
  image: Yup.mixed().notRequired(),
});

export const updatePostSchema = Yup.object().shape({
  message: Yup.string().min(5, "Message must be over 5 characters").max(500, "The message cannot exceed 500 characters").required("You must include a message"),
  image: Yup.mixed().notRequired(),
});
