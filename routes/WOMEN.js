import express from "express"
import productRepository from "../data/dashboard.js";


const router = express.Router();

router.get("/",async(req,res)=>{

    try{
        let product = await productRepository.getProductsByCategory("Women");
product = product.sort((a,b) => a.id - b.id);

    res.render('page/WOMEN',{
        feature:product.slice(0,9)
    });
    }catch(error){
        console.log(error);
    }

   
  
})


export default router;