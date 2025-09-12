














import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// View engine setup
app.set('view engine', 'ejs');  // Removed space
app.set('views', path.join(__dirname, 'views'));  // Changed to 'views'

app.use(express.static(path.join(__dirname, 'public')));

// Route imports (corrected syntax)
import homeroute from "./routes/home.js";
import productroute from "./routes/product.js";

app.use("/", homeroute);
app.use("/products", productroute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});