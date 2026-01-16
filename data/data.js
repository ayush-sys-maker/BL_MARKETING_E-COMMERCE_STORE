import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

const data = new Pool({
  connectionString: isProduction
    ? process.env.DATABASE_URL        // Neon / Render
    : process.env.LOCAL_DATABASE_URL, // Local PostgreSQL

  ssl: isProduction
    ? { rejectUnauthorized: false }   // Cloud DBs
    : false                           // Local DB
});

// Optional: force schema (safe for both)
data.on("connect", async (client) => {
  await client.query("SET search_path TO public");
});

// One-time startup test
(async () => {
  try {
    const client = await data.connect();
    console.log(
      "✅ Successfully connected to",
      isProduction ? "Production PostgreSQL" : "Local PostgreSQL"
    );
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})();

export default data;
