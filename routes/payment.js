import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import productRepository from "../data/dashboard.js";

const router = express.Router();


const razorpay = new Razorpay({
    key_id: "rzp_test_R7F4kHOOdt5JwN",
    key_secret: "Ya8wjqwWbPM9X47Hdqb8czFz"
  });









// Get all cart items for the user
router.get("/checkout", async (req, res) => {
    const user_id = req.session.user?.id;  // assume you store logged-in user in session
   


if(!user_id){
    return res.send("Please login to checkout")
}
const cartitems = await productRepository.getCart(user_id)
const total = cartitems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

const address = await productRepository.getaddress(user_id)


console.log(cartitems);
console.log("Calculated Total:", total);
    
 
    res.render("page/paymen", { cartItems: cartitems ,total, key_id:"rzp_test_R7F4kHOOdt5JwN",address:address});
  });
  

  router.post("/checkout/address", async (req, res) => {
    const user_id = req.session.user?.id;
    if (!user_id) return res.send("Please login");
  
    const { email, firstName, user_address, city, state, zip, phone_number } = req.body;
  
    await productRepository.addaddress(
      email, firstName, user_address, city, state, zip, phone_number, user_id
    );


    const address = await productRepository.getaddress(user_id)
    console.log(address);
    
  
    res.redirect("/payment/checkout");  // after saving address, go back to checkout
  });


router.post("/removeaddress/:id", async (req, res) => {
    const { id } = req.params;
    const user_id = req.session.user?.id;
    const result = await productRepository.removeaddress(user_id, id);
    console.log(result);
    res.redirect("/payment/checkout");
  });







router.post("/remove/:id", async (req, res) => {
    const { id } = req.params;
    const user_id = req.session.user?.id;
    const result = await productRepository.removepayment(user_id, id);
    console.log(result);
    res.redirect("/payment/checkout");
});



router.post("/create-order",async (req,res)=>{
    try{
      let { amount } = req.body;

      // Ensure it's number, not string
      amount = Number(amount);
  

        const options={
            amount: amount*100,
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
        }
        const order = await razorpay.orders.create(options);
        console.log(amount);
        console.log(order);
        res.json({order});
    }catch(error){
        res.status(500).json({error: "Failed to create order"});
        console.log(error);
    }
})


// 2. Verify payment after success
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256","Ya8wjqwWbPM9X47Hdqb8czFz" )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment success → save order in DB
      // await productRepository.saveOrder(req.session.user.id, cartitems, razorpay_payment_id);
      await productRepository.clearCart(req.session.user.id); 
      res.json({ status: "success" });
    } else {
      res.json({ status: "failed" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});




export default router;