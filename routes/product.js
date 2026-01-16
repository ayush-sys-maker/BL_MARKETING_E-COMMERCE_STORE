import express from "express"
import productRepository from "../data/dashboard.js"

const router = express.Router()

// List route - should come first
router.get("/", async (req, res) => {
    try {
        let product = await productRepository.getProductsByCategory("Sportswear")
        res.render('page/sportswear', { feature: product.slice(0, 8) })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

// Detail route - should come after,
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const error = req.query.error || null
        
        if (isNaN(id)) {
            return res.status(400).send('Invalid product ID')
        }

        let product = await productRepository.getProductById(id)

        if (!product) {
            return res.status(404).send('Product not found')
        }

        // Colors
        product.colors = product.color
            ? product.color.split(",").map(c => c.trim())
            : []

        // Sizes
        product.sizes = product.size
            ? product.size.split(",").map(s => s.trim())
            : ["S","M","L","XL"]

        // IMAGES PARSING (correct handling for PostgreSQL format)
        if (product.images && typeof product.images === 'string') {
    let cleaned = product.images.replace(/[{}]/g, '');
    cleaned = cleaned.replace(/""/g, '"').replace(/"/g, '');
    cleaned = cleaned.replace(/\\/g, '/');     // Convert backslashes
    cleaned = cleaned.replace(/\/+/g, '/');    // Normalize slashes
    product.images = cleaned.split(',').map(img => img.trim());
} else {
    product.images = [];
}

        console.log("PARSED IMAGES:", product.images)

        res.render('page/product', {
            title: product.name,
            product,
            error
        })

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})
export default router