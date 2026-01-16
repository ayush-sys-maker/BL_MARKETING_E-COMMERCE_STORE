import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import data from "../data/data.js"; // your DB pool
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check admin row
    const result = await data.query(
      "SELECT id, username, password ,role FROM user_table WHERE username = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const admin = result.rows[0];

    // 2. Compare password
    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });

  } catch (err) {
    console.error("ADMIN LOGIN ERROR", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
