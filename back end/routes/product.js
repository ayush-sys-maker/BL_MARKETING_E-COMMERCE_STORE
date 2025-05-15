import express from "express"
import {products} from "../data/product.js"

const router = express.Router();

// Handle all categories with one route
router.get("/:category/:id", (req, res) => {
    const category = req.params.category; // 'men', 'women', or 'kids'
    const id = parseInt(req.params.id);
    
    // Check if the category exists in your products data
    if (!products[category]) {
        return res.status(404).send('Category not found');
    }
    
    const product = products[category].find(p => p.id === id);
    
    if (!product) return res.status(404).send('Product not found');
    
    res.render('page/product', {
        title: `${product.name}`,
        product
    });
});

export default router;