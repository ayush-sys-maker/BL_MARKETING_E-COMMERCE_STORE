import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import data from "./data/data.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // ✅ for form POST
app.use(express.json()); // ✅ for JSON
app.use(methodOverride("_method")); // Moved up before session middleware

// Session configuration
app.use(session({
  store: new (connectPgSimple(session))({
    conObject: {
      connectionString: process.env.DATABASE_URL || "postgres://postgres:987654@localhost:5432/BL MARKETING"
    },
    createTableIfMissing: true   // auto-create session table
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Debug middleware
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Request Headers:', req.headers['content-type']);
  next();
});

// Make user available in views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Import routes
import homeroute from "./routes/MEN.js";
import productroute from "./routes/product.js";
import homepage from "./routes/homepage.js";
import WOMEN from "./routes/WOMEN.js";
import SOCKS from "./routes/SOCKS.js";
import KIDS from "./routes/KIDS.js";
import cart from "./routes/cart.js";
import payment from "./routes/payment.js";
import sportswear from "./routes/sportswear.js";
import auth from "./routes/auth.js";
import search from "./routes/search.js";
import methodOverride from "method-override";
import order from "./routes/order.js";
import whatsapp from "./routes/whatsapp.js";

// Use routes
app.use("/MEN", homeroute);
app.use("/products", productroute);
app.use("/home", homepage);
app.use("/WOMEN", WOMEN);
app.use("/SOCKS", SOCKS);
app.use("/KIDS", KIDS);
app.use("/cart", cart);
app.use("/payment", payment);
app.use("/sportswear", sportswear);
app.use("/auth", auth); // ✅ Login/Signup routes
app.use("/search", search);
app.use("/order", order);
app.use("/whatsapp", whatsapp);  // WhatsApp webhook routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
