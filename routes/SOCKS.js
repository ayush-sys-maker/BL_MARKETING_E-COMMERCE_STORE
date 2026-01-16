import express from "express"
import productRepository from "../data/dashboard.js";



const router = express.Router();

router.get("/",async(req,res)=>{ 
    try{
        let product = await productRepository.getProductsByCategory("socks");


      product = product.map(p => {
      if (typeof p.images === 'string') {
        // Remove { } and parse into array
        let cleaned = p.images.replace(/[{}]/g, '');
        // Split by comma if multiple
        let arr = cleaned.split(',').map(item => item.replace(/"/g, '').replace(/\\/g, '/'));
        p.images = arr;
      }
      return p;
    });







product = product.sort((a,b) => a.id - b.id);
    res.render('page/socks',{
        feature:product.slice(0,9)
    });
    }catch(error){
        console.log(error);
    }
})


export default router;