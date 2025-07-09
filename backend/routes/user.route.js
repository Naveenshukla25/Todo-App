import express from "express";
import {
  login,
  Logout,
  register,
} from "../../backend/controller/user.controller.js";

const route = express.Router();

route.post("/signup", register);
route.post("/login", login);
route.get("/logout", Logout);

export default route;
