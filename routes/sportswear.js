import express from "express"
import productRepository from "../data/dashboard.js"



const router = express.Router();

router.get("/",async(req,res)=>{

    try{
        const product = await productRepository.getProductsByCategory("Sportswear");

        product = product.sort((a,b) => a.id - b.id);

    res.render('page/sportswear',{feature:product.slice(0,8)});


    }catch(error){
        console.log(error);
    }
})


export default router;