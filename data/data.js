import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

// Use Render DB in production, local DB otherwise
const data = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false } // Render requires SSL
    : false,
});

export default data;

