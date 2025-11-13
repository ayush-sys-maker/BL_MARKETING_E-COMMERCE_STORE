import express from "express";
import productRepository from "../data/dashboard.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Add to cart (DB-backed)
router.get("/add/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const userid = req.session.user?.id;
    const color = req.query.color;
    const size = req.query.size;

    if (!userid) {
      return res.status(401).send("Please login to add to cart");
    }

    if (!size) {
            return res.status(400).send('Please select a size');
        }

        const productidInt = parseInt(id);
        if (isNaN(productidInt)) {
            return res.status(400).send('Invalid product ID');
        }


    await productRepository.AddToCart(userid, category, id, color, size);
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

    const cart = await productRepository.getCart(userid) || [];
    const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

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

export default router;
