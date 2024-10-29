import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", PostSchema);
