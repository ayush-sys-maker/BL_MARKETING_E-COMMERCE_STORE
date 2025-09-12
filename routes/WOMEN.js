import express from "express"
import productRepository from "../data/dashboard.js";


const router = express.Router();

router.get("/",async(req,res)=>{

    try{
        const product = await productRepository.getProductsByCategory("Women");


    res.render('page/WOMEN',{
        feature:product.slice(0,9)
    });
    }catch(error){
        console.log(error);
    }

   
  
})


export default router;