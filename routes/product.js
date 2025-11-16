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

// Detail route - should come after
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        
        // Validate ID
        if (isNaN(id)) {
            return res.status(400).send('Invalid product ID')
        }

        const product = await productRepository.getProductById(id)
        
        if (!product) {
            return res.status(404).send('Product not found')
        }

        // Process colors and sizes
        if(product.color){
            product.colors = product.color.split(",").map(color => color.trim())
        } else {
            product.colors = []
        }
        
        if(product.size){
            product.sizes = product.size.split(",").map(size => size.trim())
        } else {
            product.sizes = ["S","M","L","XL"]
        }

        res.render('page/product', {
            title: `${product.name}`,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

export default router