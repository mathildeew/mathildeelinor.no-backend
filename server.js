import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product.route.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./controllers/error.js";
import logger from "./middleware/logger.js";

// Constanst
dotenv.config();
const port = process.env.PORT || 8000;
const mongoDBUrl = process.env.MONGODB_URL;

// Create Express app
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Connect to MongoDB
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch(() => {
    console.log(`Connection failed: ${error.message}`);
  });

// Routes
app.use("/api/messages", productRouter);

// Error handler
app.use(notFound);
app.use(errorHandler);
