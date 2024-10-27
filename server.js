import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import productRouter from "./routes/product.route.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./controllers/error.js";
import logger from "./middleware/logger.js";

// Constanst
dotenv.config();
const port = process.env.PORT || 8000;
const mongoDBUrl = `mongodb+srv://admin:6miB94TL5sVZCVU3@backenddb.ue7mj.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB`;

// Create Express app
const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Setup static folder
app.use(express.static(path.join(__dirname, "public")));
app.get("/products/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "products", "index.html"));
});

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
app.use("/api/products", productRouter);

// Error handler
app.use(notFound);
app.use(errorHandler);
