import express from "express";
import productRepository from "../data/dashboard.js";
const router = express.Router();

router.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Add to cart
router.get("/add/:category/:id", async (req, res) => {
    const { category, id } = req.params;
    const userid = req.session.user?.id
    const color = req.query.color;
    const size = req.query.size;
    if(!userid) return res.send("Please login to add to cart")

    const cart = await productRepository.AddToCart(userid,category,id,color,size)
 
    res.redirect("/cart");
});

// View cart
router.get("/",  async (req, res) => {
    const userid = req.session.user?.id
    if(!userid) return res.send("Please login to view cart")
     const cart = await productRepository.getCart(userid)
    const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);  // this helps to add sum + price of current item //
 console.log(cart);

    res.render('page/cart', { cart, total, user: req.session.user }); // this takkes the cart and total to the cart.ejs //
});

// Change from using cart entry ID to product ID
router.post("/remove/:id", async (req, res) => {  // Changed from :id to :product_id
    const { id } = req.params;
    const user_id = req.session.user?.id;
    
    const result = await productRepository.removecart(user_id, id);
    console.log(id);
    res.redirect("/cart");
});

// Add this as a temporary test
router.get("/remove/:id", (req, res) => {
    console.log("Received GET request to /remove/:id - this should be a POST request");
    res.redirect("/cart");
});

export default router;
