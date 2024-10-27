import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import productRouter from "./routes/product.route.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./controllers/error.js";
import logger from "./middleware/logger.js";

// Constanst
const port = process.env.PORT || 8000;
const mongoDBUrl = `mongodb+srv://admin:6miB94TL5sVZCVU3@backenddb.ue7mj.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB`;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

// Routes
app.use("/api/products", productRouter);

// Error handler
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch(() => {
    console.log(`Connection failed`);
  });
