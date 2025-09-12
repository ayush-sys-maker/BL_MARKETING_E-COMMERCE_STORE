import express from "express";
import productRepository from "../data/dashboard.js";
import data from "../data/data.js";


const router = express.Router();

router.get("/",(req,res)=>{
   res.render("page/order_page");
})

router.get("/my-orders", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        
        // Get all orders with their items in a single query
        const { rows: orders } = await data.query(`
            SELECT 
                o.*,
                json_agg(
                    json_build_object(
                        'name', p.name,
                        'price', oi.price,
                        'quantity', oi.quantity,
                        'total', (oi.price * oi.quantity),
                        'delivery_date', (o.order_date + INTERVAL '10 days')::date
                    )
                ) as items
            FROM 
                orders o
            LEFT JOIN 
                order_items oi ON o.id = oi.order_id
            LEFT JOIN 
                products p ON oi.product_id = p.id
            WHERE 
                o.user_id = $1
            GROUP BY 
                o.id
            ORDER BY 
                o.order_date DESC
        `, [req.session.user.id]);
  
        res.render('page/order_history', { 
            orders: orders.map(order => ({
                ...order,
                items: order.items[0] ? order.items : [] // Handle case where there are no items
            })),
            user: req.session.user 
        });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).send('Error loading order history');
    }
  });


router.get("/:id",async(req,res)=>{
    try{
        const order_id = req.params.id;
        const order = await productRepository.getorderbyId(order_id);
        order.items = await productRepository.getorder_item(order_id);
       console.log(order);
    res.render('page/order_page',{order:order});
    }catch(error){
        console.log(error);
    }
})  


router.post("/addorder", express.json(), async (req, res) => {
  try {
      console.log("Request headers:", req.headers);
      console.log("Raw request body:", req.body);
      
      const { user_id, cartItems, total_amount, payment_method } = req.body;

      console.log("Parsed data:", { user_id, cartItems, total_amount,payment_method });

      if (!user_id || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
          return res.status(400).json({ 
              error: "Invalid request data",
              received: { 
                  user_id, 
                  hasCartItems: !!cartItems, 
                  isArray: Array.isArray(cartItems),
                  cartItemsLength: cartItems?.length 
              }
          });
      }

      const amount = parseFloat(total_amount);
      if (isNaN(amount)) {
          return res.status(400).json({ 
              error: "Invalid total amount",
              received: total_amount 
          });
      }

      const order = await productRepository.orders(user_id, amount, "Pending",payment_method);
      const order_id = order.id;

      // Insert order items
      for (let item of cartItems) {
          await productRepository.ORDER_item(
              order_id, 
              item.product_id, 
              item.quantity, 
              item.price
          );
      }

      res.json({   status:"success",  order_id:order_id ,user_id:user_id  });
  } catch (err) {
      console.error("Order creation failed:", err);
      res.status(500).json({ 
          error: "Order creation failed",
          details: err.message 
      });
  }
});














export default router;
