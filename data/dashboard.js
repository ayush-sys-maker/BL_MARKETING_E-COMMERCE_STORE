import data from "./data.js";

const productRepository = {

  // ---------------- PRODUCTS ----------------

  async getTrackProducts() {
    const { rows } = await data.query("SELECT * FROM public.products");
    return rows;
  },

  async getProductsByCategory(category) {
    const { rows } = await data.query(
      "SELECT * FROM public.products WHERE category = $1",
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

  async AddToCart(user_id, category, product_id, color, size) {
    const { rows } = await data.query(
      `INSERT INTO public.cart 
       (user_id, category, product_id, color, size) 
       VALUES ($1,$2,$3,$4,$5) 
       RETURNING *`,
      [user_id, category, product_id, color, size]
    );
    return rows[0];
  },

  async getCart(user_id) {
    const { rows } = await data.query(
      `
      SELECT 
        c.*, 
        p.name,
        p.price,
        p.mobile_image_url,
        p.desktop_image_url
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
      "SELECT * FROM public.orders WHERE id = $1",
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

  // ---------------- ADMIN ----------------

  async createProduct(product) {
    const { name, category, price, image, color, discount, description } = product;
    const { rows } = await data.query(
      `
      INSERT INTO public.products
      (name, category, price, image, color, discount, description)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [name, category, price, image, color, discount, description]
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
      "DELETE FROM public.products WHERE id = $1",
      [id]
    );
  }
};

export default productRepository;
