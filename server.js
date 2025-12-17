import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import methodOverride from "method-override";
import data from "./data/dashboard.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ✅ Use Render's port
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
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
      conObject:{
        host:"localhost",
        port:5432,
        user:"postgres",
        password:"987654",
        database:"BLOG SITE",
        ssl:false
      },
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production", // serve secure cookies in production
    }
  
  })
)
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

app.get("/", (req, res) => {
    res.render('page/home');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`🗄️ Database: Render PostgreSQL`);
});