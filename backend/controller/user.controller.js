import { genrateToken } from "../jwt/token.js";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "user already logged" });
    }
    if (!email || !username || !password) {
      return res.status(400).json({ msg: "all field required " });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();
    if (newUser) {
      const token = await genrateToken(newUser._id, res);
      return res.status(201).json({ msg: "user registered ", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error registering user" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "all field required " });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(user.password === password)) {
      return res.status(400).json({ msg: "invalid email or password" });
    }

    const token = await genrateToken(user._id, res);
    res.status(200).json({ msg: "user login succesfully", user, token });
  } catch (error) {
    res.status(500).json({
      msg: "error in logging",
    });
  }
};
export const Logout = (req, res) => {
  try {
    res.clearCookie("jwt", { path: "/" });
    res.status(200).json({ msg: "user logged out succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error in logout  " });
  }
};
