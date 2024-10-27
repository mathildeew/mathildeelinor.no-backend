import * as Yup from "yup";

export const createProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required").min(2, "Product name must be at least 2 characters long").max(100, "Product name must be at most 100 characters long"),
  quantity: Yup.number().typeError("Quantity must be a number").required("Quantity is required").positive("Quantity must be greater than 0").integer("Quantity must be an integer").max(9999999, "Quantity cannot be over 9999999"),
  price: Yup.number().typeError("Price must be a number").required("Price is required").positive("Price must be greater than 0").max(9999999, "Price cannot be over 9999999"),
  image: Yup.string().url("Image must be a valid URL").required("Image is required"),
});

export const updateProductSchema = Yup.object().shape({
  name: Yup.string().min(2, "Product name must be at least 2 characters long").max(100, "Product name must be at most 100 characters long").notRequired(),
  quantity: Yup.number().typeError("Quantity must be a number").positive("Quantity must be greater than 0").integer("Quantity must be an integer").notRequired(),
  price: Yup.number().typeError("Price must be a number").positive("Price must be greater than 0").max(9999999, "Price cannot be over 9999999").notRequired(),
  image: Yup.string().url("Image must be a valid URL").notRequired(),
});
