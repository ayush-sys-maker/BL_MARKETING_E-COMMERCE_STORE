import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

// Production: Render PostgreSQL | Development: Local PostgreSQL
const connectionString = process.env.DATABASE_URL;

const data = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false } // Required for Render
});

// Test connection
data.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Successfully connected to Render PostgreSQL');
    release();
  }
});

export default data;