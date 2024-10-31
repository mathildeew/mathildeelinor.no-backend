import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRouter from "./routes/post.route.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./controllers/error.js";
import logger from "./middleware/logger.js";

// Constanst
dotenv.config();
const port = process.env.PORT || 8000;
const mongoDBUrl = process.env.MONGODB_URL;

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Connect to MongoDB and set up GridFSBucket
let gridFSBucket;

mongoose
  .connect(mongoDBUrl)
  .then((connection) => {
    console.log("Connected to the database");

    const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    app.locals.gridFSBucket = gridFSBucket;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch(() => {
    console.log(`Connection failed: ${error.message}`);
  });

// Routes
app.use("/api", postRouter);

// Error handler
app.use(notFound);
app.use(errorHandler);
