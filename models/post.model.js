import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  emoji: {
    type: String,
  },
});

const PostSchema = mongoose.Schema(
  {
    user: userSchema,
    message: {
      type: String,
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
