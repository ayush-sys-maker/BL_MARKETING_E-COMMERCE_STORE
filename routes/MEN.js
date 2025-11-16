import express from "express"
import productRepository from "../data/dashboard.js";


const router = express.Router();

router.get("/", async (req,res)=>{


    try{
const product = await productRepository.getProductsByCategory("men");
product = product.sort((a,b) => a.id - b.id);

    res.render('page/layout',{
        feature:product.slice(0,6)
    });
    }catch(error){
        console.log(error);
    }
})  


export default router;