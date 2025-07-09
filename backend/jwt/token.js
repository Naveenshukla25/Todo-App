import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const genrateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};
