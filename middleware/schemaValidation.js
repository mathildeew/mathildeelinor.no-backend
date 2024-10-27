import * as Yup from "yup";

export const productSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  quantity: Yup.number().typeError("Quantity must be a number").required("Quantity is required").positive("Quantity must be greater than 0").integer("Quantity must be an integer"),
  price: Yup.number().typeError("Price must be a number").required("Price is required").positive("Price must be greater than 0").max(9999999, "Price cannot be over 9999999"),
  image: Yup.string().url("Image must be a valid URL").optional(),
});
