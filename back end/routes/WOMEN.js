import express from "express"
import { products } from "../data/product.js";



const router = express.Router();

router.get("/",(req,res)=>{

   res.render('page/WOMEN',{
        feature:products.women.slice(0,3)
    });
  
})


export default router;