import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;
dotenv.config();

const data = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Force schema for every new connection (CRITICAL FIX)
data.on("connect", async (client) => {
  await client.query("SET search_path TO public");
});

// One-time startup test (safe)
(async () => {
  try {
    const client = await data.connect();
    console.log("✅ Successfully connected to Neon PostgreSQL");
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})();

export default data;
