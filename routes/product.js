import express from "express"
import productRepository from "../data/dashboard.js";

const router = express.Router();    

// Handle all categories with one route
router.get("/:id",async (req, res) => {
    const id = parseInt(req.params.id);

    const product = await productRepository.getProductById(id);
    
    if (!product) return res.status(404).send('Product not found');
    if(product.color){
        product.colors = product.color.split(",").map(color => color.trim());
    }else{
        product.colors = [];
    }
    
if(product.size){
    product.sizes = product.size.split(",").map(size => size.trim());
}else{
    product.sizes = ["S","M","L","XL"];
}


    res.render('page/product', {
        title: `${product.name}`,
        product
    });
});

export default router;