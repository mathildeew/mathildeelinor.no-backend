import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updataProduct } from "../controllers/productControllers.js";
const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProduct);

// Create new product
router.post("/", createProduct);

// Update product
router.put("/:id", updataProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
