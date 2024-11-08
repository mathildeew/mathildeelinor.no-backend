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
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadMiddleware = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File is too large. Maximum size is 5 MB." });
      }
    } else if (err) {
      return res.status(500).json({ message: "Server error during file upload." });
    }
    next();
  });
};

export default uploadMiddleware;
