import express from "express"
import { products } from "../data/product.js";



const router = express.Router();

router.get("/",(req,res)=>{

    res.render('page/kids',{
        feature:products.kids.slice(0,9)
    });
})


export default router;