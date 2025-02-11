import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "JWT secret is not defined" });
    }
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      secret
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
}
