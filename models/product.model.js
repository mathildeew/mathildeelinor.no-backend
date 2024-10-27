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
      min: [0, "Quantity must be a positive number"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
    price: {
      type: Number,
      required: [true, "Please enter the price"],
      min: [0, "Price must be a positive number"],
      max: [9999999, "Price cannot be over 9999999"],
    },
    image: {
      type: String,
      required: false,
      validate: {
        validator: function (value) {
          const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
          return urlRegex.test(value);
        },
        message: "Please enter a valid URL for the image",
      },
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true, // Corrected from timestamp to timestamps
  }
);

export const Product = mongoose.model("Product", ProductSchema);
