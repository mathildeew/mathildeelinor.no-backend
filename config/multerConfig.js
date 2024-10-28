import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGODB_URL;

const storage = new GridFsStorage({
  url: mongoURI, // MongoDB URI
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads", // Navnet på bucket som skal brukes
    };
  },
});

// Initialiser multer med storage
const upload = multer({ storage });

export default upload;
