import dotenv from "dotenv";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads",
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
