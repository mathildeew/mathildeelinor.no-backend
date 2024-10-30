import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    emoji: { type: String },
    name: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
