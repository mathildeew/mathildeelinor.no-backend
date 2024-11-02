import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import guestbookRouter from "./routes/guestbook.route.js";
import notFound from "./middleware/notFound.js";
import logger from "./middleware/logger.js";
import errorHandler from "./controllers/error.js";

// Constanst
dotenv.config();
// const port = process.env.PORT || 8000;
const PORT = process.env.PORT || 8000;

const mongoDBURI = process.env.MONGODB_URI;

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
mongoose
  .connect(mongoDBURI)
  .then((connection) => {
    console.log("Connected to the database");

    const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    app.locals.gridFSBucket = gridFSBucket;

    // Start the server
    startServer();
  })
  .catch((connectionError) => {
    console.log(`Connection failed: ${connectionError.message}`);
  });

// Function to start the server
const startServer = () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

// Routes
app.use("/api", guestbookRouter);

// Error handler
app.use(notFound);
app.use(errorHandler);
