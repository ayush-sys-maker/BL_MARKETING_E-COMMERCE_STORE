import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import Razorpay from "razorpay";
import dotenv from "dotenv";


dotenv.config();


import methodOverride from "method-override";
import data from "./data/data.js";





const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ✅ Use Render's port
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
// ✅ Session store with Render PostgreSQL
const PgSession = connectPgSimple(session);

// if behind proxy (Render/Heroku) so secure cookies work
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}


app.use(
  session({
    store: new PgSession({
      pool: data, // ✅ USE EXISTING NEON POOL
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    },
  })
);
// Debug middleware
app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

// Make user available in views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


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
import order from "./routes/order.js";
import whatsapp from "./routes/whatsapp.js";
import admin from "./routes/adminpanel.js";
import  view from "./routes/view.js";
import adminAuthRoute from "./routes/adminauth.js";











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
app.use("/auth", auth);
app.use("/search", search);
app.use("/order", order);
app.use("/whatsapp", whatsapp);
app.use("/admin", admin);
app.use("/view", view);
app.use("/admin-auth", adminAuthRoute);


app.get("/", (req, res) => {
    res.render('page/home');
});

app.get("/admin/login", (req, res) => {
  res.render("page/adminloginpage");
});


console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(process.env.DATABASE_URL)


app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`🗄️ Database: Render PostgreSQL`);
});