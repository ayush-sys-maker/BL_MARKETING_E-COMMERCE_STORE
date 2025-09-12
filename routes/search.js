import express from "express";
import productRepository from "../data/dashboard.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const searchterm = req.query.q;
    if (!searchterm) {
        return res.render("page/searchresult", { products: [] ,searchterm:""});
    }
    const products = await productRepository.searchProducts(searchterm);
    res.render("page/searchresult", { products ,searchterm});
});

export default router;  