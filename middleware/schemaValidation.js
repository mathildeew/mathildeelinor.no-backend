import * as Yup from "yup";

export const productSchemaValidation = Yup.object().shape({
  quantity: Yup.number().typeError("Quantity must be a number").required("Quantity is required").positive("Quantity must be greater than 0"),
  price: Yup.number().typeError("Price must be a number").required("Price is required").max(9999999, "Price cannot be over 9999999"),
});
