import express from "express"
import productRepository from "../data/dashboard.js"
import multer from "multer";
import path from "path";
import { adminAuth } from "./adminauthmiddleware.js";
import jwt from "jsonwebtoken";



const router = express.Router();





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get("/", adminAuth, async(req,res)=>{

  const token = req.query.token;

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

    
    try {

         const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).send("Not authorized");
    }
        
const TotalUsers = await productRepository.getTotalUsers();
const TotalOrders = await productRepository.getTotalOrders();
const TotalRevenue = await productRepository.getTotalRevenue();
const Orders = await productRepository.getRecentOrders();
const RecentUsers = await productRepository.getRecentUsers();
const AllProducts = await productRepository.getAllProducts();




    res.render('page/adminpanel',
        {TotalUsers,TotalOrders,TotalRevenue,Orders,RecentUsers,AllProducts,token}

    );
        
    } catch (error) {

         console.error("ADMIN DETAIL ERROR 👇");
    console.error(error);
        res.status(500).send('Server error');
        
    }
})





router.post("/delete_user/:id", adminAuth  , async(req, res) => {

  console.log("QUERY:", req.body);

const token = req.body.token;

if(!token ){0
  return res.status(401).send("NO TOKEN")
}

  
try {


  const decoded = jwt.verify(token,process.env.JWT_SECRET)

   if (decoded.role !== "admin"){
    return res.status(401).send("ACCESS IS ONLY FOR ADMINS")
   }

await productRepository.deleteUserById(req.params.id);

res.redirect(`/admin?token=${token}`);


    
} catch (error) {
    console.error("DELETE USER ERROR 👇");
    console.error(error);
    res.status(500).send('Server error');
}




});


router.post("/delete_product/:id", adminAuth,  async(req, res) => {

  console.log("QUERY:", req.body);

const token = req.body.token;

if(!token ){0
  return res.status(401).send("NO TOKEN")
}



    try {

      const decoded = jwt.verify(token,process.env.JWT_SECRET)

   if (decoded.role !== "admin"){
    return res.status(401).send("ACCESS IS ONLY FOR ADMINS")
   }

    await productRepository.deleteProduct(req.params.id);
    
    res.redirect("/admin");

        
    } catch (error) {

        console.error("DELETE PRODUCT ERROR 👇");
    console.error(error);
        res.status(500).send('Server error');
        
    }



} )

router.post("/add_product",  upload.array('images', 10), async (req, res) => {
  try {
    const { Pname, category, price, size, color, description, discounted_price } = req.body;

    // Get array of uploaded image paths
    const images = req.files.map(file => file.path);

    await productRepository.createProduct(
      Pname, category,description, price, color,size,images,discounted_price  
    );

    res.redirect("/admin");
  } catch (error) {
    console.error("ADD PRODUCT ERROR 👇");
    console.error(error);
    res.status(500).send('Server error');
  }
});



router.post("/cancel_order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    await productRepository.cancelOrder(orderId);
    res.redirect("/home");
  } catch (error) {
    console.error("CANCEL ORDER ERROR 👇");
    console.error(error);
    res.status(500).send('Server error');
  } 
});



export default router;