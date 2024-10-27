import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    quantity: {
      type: Number,
      required: [true, "Must be a number"],
      default: 0,
      min: [0, "Quantity must be a positive number"],
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Must be a number"],
      default: 0,
      min: [0, "Quantity must be a positive number"],
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
