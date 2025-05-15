import express from "express"
import { products } from "../data/product.js";



const router = express.Router();

router.get("/",(req,res)=>{

    res.render('page/socks',{
        feature:products.socks.slice(0,6)
    });
})


export default router;