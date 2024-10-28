import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: false,
    },
    // image: {
    //   type: String,
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", PostSchema);
