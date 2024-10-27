import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    quantity: {
      type: Number,
      required: [true, "Please enter the quantity"],
      default: 0,
      min: [0, "Quantity must be a positive number"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Please enter the price"],
      default: 0,
      min: [0, "Price must be a positive number"],
      max: [9999999, "Price cannot be over 9999999"],
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamp: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);
