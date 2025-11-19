import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import methodOverride from "method-override";
import db from "../data/data.js"; // Pool from your data file

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Session store
const PgSession = connectPgSimple(session);
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(
  session({
    store: new PgSession({
      pool: db,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Route imports (corrected syntax)
import homeroute from "./routes/MEN.js";
import productroute from "./routes/product.js";
import homepage from "./routes/homepage.js"
import WOMEN from "./routes/WOMEN.js"
import SOCKS from "./routes/SOCKS.js"
import KIDS from "./routes/KIDS.js"

app.use("/MEN", homeroute);
app.use("/products", productroute);
app.use("/home",homepage);
app.use("/WOMEN",WOMEN);
app.use("/SOCKS",SOCKS);
app.use("/KIDS",KIDS);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});