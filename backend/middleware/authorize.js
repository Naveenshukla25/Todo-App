import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).json({ message: "Unauthorized user" });
  }

  try {
    const decoder = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoder.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
};

export { authenticate };
