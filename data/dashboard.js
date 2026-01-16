import data from "./data.js";

const productRepository = {

  // ---------------- PRODUCTS ----------------

  async getTrackProducts() {
    const { rows } = await data.query("SELECT * FROM public.products");
    return rows;
  },

  async getProductsByCategory(category) {
    const { rows } = await data.query(
      "SELECT * FROM public.products WHERE category = $1 AND is_deleted = FALSE ORDER BY id",
      [category]
    );
    return rows;
  },

  async getProductById(id) {
    const { rows } = await data.query(
      "SELECT * FROM public.products WHERE id = $1",
      [id]
    );
    return rows[0];
  },

  async searchProducts(searchterm) {
    const { rows } = await data.query(
      "SELECT * FROM public.products WHERE name ILIKE $1 ORDER BY name",
      [`%${searchterm}%`]
    );
    return rows;
  },

  // ---------------- CART ----------------

  async AddToCart(user_id, category, product_id, color, size , quantity) { {
    const { rows } = await data.query(
      `INSERT INTO public.cart 
       (user_id, category, product_id, color, size , quantity) 
       VALUES ($1,$2,$3,$4,$5,$6) 
       RETURNING *`,
      [user_id, category, product_id, color, size , quantity]
    );
    return rows[0];
  } },  

  async getCart(user_id) {
    const { rows } = await data.query(
      `
      SELECT 
        c.*, 
        p.name,
        p.price,
        p.images
       
      FROM public.cart c
      JOIN public.products p
        ON c.product_id = p.id
      WHERE c.user_id = $1
      `,
      [user_id]
    );
    return rows;
  },

  async removecart(user_id, cart_id) {
    const { rows } = await data.query(
      "DELETE FROM public.cart WHERE user_id = $1 AND id = $2 RETURNING *",
      [parseInt(user_id), parseInt(cart_id)]
    );
    return rows;
  },

  async clearCart(user_id) {
    await data.query(
      "DELETE FROM public.cart WHERE user_id = $1",
      [user_id]
    );
  },

  // ---------------- ADDRESS ----------------

  async addaddress(email, firstname, street_address, city, state, pincode, phone_number, user_id) {
    const { rows } = await data.query(
      `
      INSERT INTO public.address
      (email, firstname, street_address, city, state, code, phone_number, user_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [email, firstname, street_address, city, state, pincode, phone_number, user_id]
    );
    return rows[0];
  },

  async getaddress(user_id) {
    const { rows } = await data.query(
      "SELECT * FROM public.address WHERE user_id = $1",
      [user_id]
    );
    return rows;
  },

  async removeaddress(user_id, address_id) {
    const { rows } = await data.query(
      "DELETE FROM public.address WHERE user_id = $1 AND id = $2 RETURNING *",
      [parseInt(user_id), parseInt(address_id)]
    );
    return rows;
  },

  // ---------------- ORDERS ----------------

  async orders(user_id, total_amount, status, payment_status) {
    const { rows } = await data.query(
      `
      INSERT INTO public.orders 
      (user_id, total_amount, order_date, status, payment_status)
      VALUES ($1,$2,NOW(),$3,$4)
      RETURNING id
      `,
      [user_id, total_amount, status, payment_status]
    );
    return rows[0];
  },

  async ORDER_item(order_id, product_id, quantity, price) {
    await data.query(
      `
      INSERT INTO public.order_items 
      (order_id, product_id, quantity, price)
      VALUES ($1,$2,$3,$4)
      `,
      [order_id, product_id, quantity, price]
    );
  },

  async getorderbyId(order_id) {
    const { rows } = await data.query(
      "SELECT * FROM  public.orders     WHERE id = $1   and is_cancel = false",
      [order_id]
    );
    return rows[0];
  },

  async getorder_item(order_id) {
    const { rows } = await data.query(
      `
      SELECT 
        p.name,
        oi.price,
        oi.quantity,
        (oi.price * oi.quantity) AS total,
        (o.order_date + INTERVAL '10 days')::date AS delivery_date
      FROM public.order_items oi
      JOIN public.products p ON oi.product_id = p.id
      JOIN public.orders o ON oi.order_id = o.id
      WHERE oi.order_id = $1
      `,
      [order_id]
    );
    return rows;
  },



  async updateCartItemQuantity(user_id, cart_id, quantity) {
 
    if (quantity <= 0) {
 return await data.query( 
      "DELETE FROM public.cart WHERE id = $1 AND user_id = $2 RETURNING *",
      [ cart_id, user_id ]
    )
    }
 
return await data.query(
  `
  UPDATE cart
  SET quantity = $1
  WHERE id = $2 AND user_id = $3
  RETURNING *
  `,
  [quantity, cart_id, user_id]   // ✅ CORRECT ORDER
);



    },


  








  // ---------------- ADMIN ----------------


  async createProduct(name, category,description, price,color,size, images , discount) {

    const { rows } = await data.query(
      `
      INSERT INTO public.products
      (name, category,description, price,color,size,images, discount)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [name, category,description, price, color,size,images, discount]
    );
    return rows[0];
  },

  async updateProduct(id, updates) {
    const { name, category, price, image, color, discount, description } = updates;
    const { rows } = await data.query(
      `
      UPDATE public.products
      SET name=$1, category=$2, price=$3, image=$4,
          color=$5, discount=$6, description=$7
      WHERE id=$8
      RETURNING *
      `,
      [name, category, price, image, color, discount, description, id]
    );
    return rows[0];
  },

 async deleteProduct(id) {
  await data.query(
    "UPDATE public.products SET is_deleted = TRUE WHERE id = $1",
    [id]
  );
},

  async getTotalUsers() {
    const { rows } = await data.query(
      "SELECT COUNT(*) AS total_users FROM public.user_table"
    );
    return Number(rows[0].total_users);
  },
  async getTotalOrders() {
    const { rows } = await data.query(
      "SELECT COUNT(*) AS total_orders FROM public.orders"
    );
    return Number(rows[0].total_orders);
  },
  async getTotalRevenue() {
    const { rows } = await data.query(
      "SELECT SUM(total_amount) AS total_revenue FROM public.orders"
    );
    return Number(rows[0].total_revenue)   ;
  },
  async getRecentUsers() {
    const { rows } = await data.query(
      "SELECT * FROM public.user_table  WHERE is_deleted = FALSE ORDER BY created_at DESC LIMIT 5"
    );
    return rows;
  },
  async getRecentOrders() {
    const { rows } = await data.query(
      `SELECT DISTINCT ON (o.id)
  o.id AS order_id,
  TO_CHAR(o.order_date, 'YYYY-MM-DD HH24:MI') AS order_date,
  o.total_amount,
  o.status,
  o.payment_status,
  o.is_cancel,
  u.name,
  oi.quantity
  
FROM public.orders o
JOIN public.user_table u ON o.user_id = u.id
Join public.order_items oi ON o.id = oi.order_id
ORDER BY o.id, o.order_date DESC
LIMIT 5;
;`
    );
    return rows;
  },



async getOrderDetails(order_id) {  
    const { rows } = await data.query(
      `
      SELECT  * FROM public.orders  where id = $1
      `,
      [order_id]
    );
     return rows[0];

  },


  async deleteUserById(user_id) {
    await data.query(
      "update public.user_table set is_deleted = true where id = $1",
      [user_id]
    );
  },



  async getAllProducts(){
    const { rows } = await data.query(
      "SELECT * FROM public.products WHERE is_deleted = FALSE"
    );
    return rows;
  },
  async cancelOrder(order_id) {
    await data.query(
      "UPDATE public.orders SET is_cancel = true WHERE id = $1",
      [order_id]
    );
  }












};






export default productRepository;
