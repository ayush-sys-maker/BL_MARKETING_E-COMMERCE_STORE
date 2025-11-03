import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import methodOverride from "method-override";
import fs from "fs"; // ✅ ADD THIS
import data from "./data/dashboard.js"; // ✅ ADD THIS

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Auto-run schema on startup
async function setupDatabase() {
  try {
    console.log("🔄 Setting up database tables from schema.sql...");
    
    // Read your schema.sql file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Run the schema
    await data.query(schemaSQL);
    console.log("✅ All tables created from schema.sql");
  } catch (error) {
    console.log("Database setup note:", error.message);
  }
}

// Call this function before starting server
setupDatabase();

const app = express();

// ✅ Use Render's port or fallback to 3000
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// ✅ Session store with connect-pg-simple
const PgSession = connectPgSimple(session);

app.use(
  session({
    store: new PgSession({
      conObject: {
        connectionString:
          process.env.DATABASE_URL ||
          "postgres://postgres:987654@localhost:5432/BL_MARKETING",
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      },
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// Debug middleware
app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  console.log("Request Headers:", req.headers["content-type"]);
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

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});