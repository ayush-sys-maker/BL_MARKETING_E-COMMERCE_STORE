import jwt from "jsonwebtoken";

export function adminAuth(req, res, next) {
  let token;

  // 1. Try header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. Try query param
  if (!token && req.query.token) {
    token = req.query.token;
  }

if (!token && req.body && req.body.token) {
  token = req.body.token;
}

  // If no token anywhere
  if (!token) return res.status(401).send("Access Denied: No Token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).send("Access Denied: Not Admin");
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}