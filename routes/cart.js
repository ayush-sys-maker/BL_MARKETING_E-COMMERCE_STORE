import express from "express";
import productRepository from "../data/dashboard.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

router.post("/add/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const userid = req.session.user?.id;

    const { color, size, quantity } = req.body;

    if (!userid) {
      return res.status(401).send("Please login to add to cart");
    }

    if (!size) {
      return res.redirect(`/products/${id}?error=Please select a size`);
    }

    const productidInt = parseInt(id);
    if (isNaN(productidInt)) {
      return res.status(400).send("Invalid product ID");
    }

    await productRepository.AddToCart(
      userid,
      category,
      productidInt,
      color,
      size,
      Number(quantity)
    );

    return res.redirect("/cart");
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(500).send("Failed to add to cart");
  }
});

// View cart (DB-backed)
router.get("/", async (req, res) => {
  try {
    const userid = req.session.user?.id;
    if (!userid) return res.status(401).send("Please login to view cart");

    let cart = await productRepository.getCart(userid) || [];

     
const total = cart.reduce( (sum, item) =>  sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);


cart = cart.map(item =>{
  let img = item.images

  img = img.replace(/[{}]/g, "");

  // remove escaped slashes
  img = img.replace(/\\\\/g, "/");

  // remove quotes
  img = img.replace(/"/g, "");

  item.images = img; // single string path

  return item
})



    console.log("Cart for user", userid, cart);
    return res.render("page/cart", { cart, total, user: req.session.user });
  } catch (err) {
    console.error("Error fetching cart:", err);
    return res.status(500).send("Failed to load cart");
  }
});

// Remove from cart (DB-backed) - POST
router.post("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userid = req.session.user?.id;
    if (!userid) return res.status(401).send("Please login to modify cart");

    await productRepository.removecart(userid, id);
    return res.redirect("/cart");
  } catch (err) {
    console.error("Error removing from cart:", err);
    return res.status(500).send("Failed to remove item");
  }
});


router.post ("/update-quantity", async (req, res) => {
try {
const userid = req.session.user?.id;
if (!userid) return res.status(401).send("Please login to modify cart");

const { quantity ,cartId } = req.body;

 const result =  await productRepository.updateCartItemQuantity(userid, cartId, quantity);
console.log("Rows updated:", result.rowCount); 
res.json({ success: true });

}catch (err) {
console.error("Error updating cart:", err);
return res.status(500).send("Failed to update item");
}

})
export default router;
