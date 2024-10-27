import express from "express";
import { getProducts } from "../controllers/products/getProducts.js";
import { getProduct } from "../controllers/products/getProduct.js";
import { createProduct } from "../controllers/products/createProduct.js";
import { updateProduct } from "../controllers/products/updateProduct.js";
import { deleteProduct } from "../controllers/products/deleteProduct.js";
import { validateProduct } from "../middleware/productValidation.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Create new product
router.post("/", validateProduct, createProduct);

// Get single product
router.get("/:id", getProduct);

// Update product
router.put("/:id", validateProduct, updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
