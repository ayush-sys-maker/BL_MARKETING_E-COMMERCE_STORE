import data from './data.js';









const productRepository  = {


  // Get all products
  async getTrackProducts() {
    const { rows } = await data.query('SELECT * FROM products');
    return rows;
  },




  // Get products by category
  async getProductsByCategory(category) {
    const { rows } = await data.query(
      'SELECT * FROM products WHERE category = $1',
      [category]
    );
    return rows;
  },

  // Get product by ID
  async getProductById(id) {
   try {
if(typeof id !=="number"||isNaN(id)){
  throw new Error ("Invalid product ID");

  const result = await data.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0];  

   }}catch(err){

   }
  },


// add to cart

async AddToCart(user_id,category,product_id,color,size){

  
  const {rows} = await data.query("INSERT INTO cart (user_id,category,product_id,color,size) VALUES ($1, $2,$3,$4,$5)", [user_id,category,product_id,color,size]);
  return rows[0];
},

// get cart

async getCart( user_id){

  const {rows} = await data.query(
    `SELECT c.*, p.name,p.price,p.mobile_image_url,p.desktop_image_url
FROM cart c
JOIN products p
ON c.product_id = p.id AND c.category = p.category
WHERE c.user_id = $1;`, [user_id]);
  return rows;
},

async removecart(user_id, product_id) {
  console.log(`Deleting: user_id=${typeof user_id}(${user_id}), product_id=${typeof product_id}(${product_id})`);
  
  // Explicitly convert to integers if needed
  user_id = parseInt(user_id);
  product_id = parseInt(product_id);
  
  const {rows} = await data.query(
    "DELETE FROM cart WHERE user_id = $1 AND id = $2 RETURNING *",
    [user_id, product_id]
  );
  return rows;
},

async removepayment(user_id, product_id) {
  console.log(`Deleting: product_id=${product_id} from payment form `);
  
  // Explicitly convert to integers if needed
  user_id = parseInt(user_id);
  product_id = parseInt(product_id);
  
  const {rows} = await data.query(
    "DELETE FROM cart WHERE user_id = $1 AND id = $2 RETURNING *",
    [user_id, product_id]
  );
  
  return rows;
},


//searchbar

async searchProducts(searchterm){
  const {rows} = await data.query("SELECT * FROM products WHERE name ILIKE $1 order by name  ", [`%${searchterm}%`]);
  return rows;
},


async checkout(user_id){

const {rows} = await data.query("SELECT * FROM cart WHERE user_id = $1", [user_id]);
return rows;
},


async addaddress(email, firstname,  street_address, city, state, pincode,phone_number,user_id) {
  const {rows} = await data.query("INSERT INTO address (email, firstname, street_address, city, state, code,phone_number,user_id) VALUES ($1, $2, $3, $4, $5, $6,$7,$8)", [email, firstname, street_address, city, state, pincode,phone_number,user_id]);
  return rows[0];
},

async getaddress(user_id){
  const {rows} = await data.query("SELECT * FROM address WHERE user_id = $1", [user_id]);
  return rows;
},

async removeaddress(user_id, address_id) {
  console.log(`Deleting: address_id=${address_id} from address form `);
  
  // Explicitly convert to integers if needed
  user_id = parseInt(user_id);
  address_id = parseInt(address_id);
  
  const {rows} = await data.query(
    "DELETE FROM address WHERE user_id = $1 AND id = $2 RETURNING *",
    [user_id, address_id]
  );
  
  return rows;
},

async orders(user_id, total_amount, status, payment_status) {
  const { rows } = await data.query(
    "INSERT INTO orders (user_id, total_amount, order_date, status, payment_status) VALUES ($1, $2, NOW(), $3, $4) RETURNING id",
    [user_id, total_amount, status, payment_status]
  );

  return rows[0]
}
,

async ORDER_item(order_id,product_id,quantity,price){
  const {rows} = await data.query("INSERT INTO order_items (order_id,product_id,quantity,price) VALUES ($1,$2,$3,$4)",[order_id,product_id,quantity,price])

  return rows;
},


async getorderbyId(order_id){
  const {rows} = await data.query("SELECT * FROM orders WHERE id = $1 order by order_date desc  ", [order_id]);
  return rows[0];
},

async getorder_item(order_id) {
  const { rows } = await data.query(`
    SELECT 
      p.name, 
      oi.price, 
      oi.quantity, 
      (oi.price * oi.quantity) as total,
      (o.order_date + INTERVAL '10 days')::date as delivery_date
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    JOIN orders o ON oi.order_id = o.id
    WHERE oi.order_id = $1
  `, [order_id]);
  
  return rows;
},


async clearCart(user_id){
  const {rows} = await data.query("DELETE FROM cart WHERE user_id = $1", [user_id]);
  return rows;
},






  // Create a new product
  async createProduct(product) {
    const { name, category, price, image, color, discount, description } = product;
    const { rows } = await data.query(
      `INSERT INTO  products (name, category, price, image, color, discount, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, category, price, image, color, discount, description]
    );
    return rows[0];
  },

  // Update a product
  async updateProduct(id, updates) {
    const { name, category, price, image, color, discount, description } = updates;
    const { rows } = await  data.query(
      `UPDATE products 
       SET name = $1, category = $2, price = $3, image = $4, 
           color = $5, discount = $6, description = $7, updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [name, category, price, image, color, discount, description, id]
    );
    return rows[0];
  },

  // Delete a product
  async deleteProduct(id) {
    await data.query('DELETE FROM products WHERE id = $1', [id]);
  }
};

export default productRepository;

export async function getProductById(productId) {
  try {
    // ✅ Ensure productId is a number
    if (typeof productId !== "number" || isNaN(productId)) {
      throw new Error("Product ID must be a valid number");
    }

    const result = await data.query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );
    return result.rows[0] || null;
  } catch (err) {
    console.error("Error in getProductById:", err);
    throw err;
  }
}
