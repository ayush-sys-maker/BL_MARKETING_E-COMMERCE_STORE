import express from "express";
import data from "../data/data.js";



const router = express.Router();


// View route
router.get("/:id",async(req, res) => {
    try {

const order_id = req.params.id;

 const { rows} = await data.query(`
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
                o.id = $1
            GROUP BY 
                o.id
            ORDER BY 
                o.order_date DESC
        `, [order_id]);

        const viewOrder = rows[0];

          res.render("page/view",{viewOrder}  );
        
    } catch (error) {
        console.error("VIEW ORDER ERROR 👇");
        console.error(error);
        res.status(500).send('Server error');
    }
   
});



export default router;