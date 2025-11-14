import express from "express";
import productRepository from "../data/dashboard.js";

const router = express.Router();

// Handle all categories with one route
router.get("/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    
    // ✅ Parse and validate id BEFORE using it
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return res.status(400).send("Invalid product ID");
    }

    console.log(`Fetching product: category=${category}, id=${productId}`);
    
    const product = await productRepository.getProductById(productId);
    
    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("page/product", { product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Failed to load product");
  }
});

export default router;