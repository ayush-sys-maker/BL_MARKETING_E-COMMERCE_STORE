import express from "express"
import { products } from "../data/product.js";



const router = express.Router();

router.get("/",(req,res)=>{

    res.render('page/layout',{
        feature:products.men.slice(0,6)
    });
})


export default router;