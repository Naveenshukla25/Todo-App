import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
//midddelware and parsing  request into
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL;

//db connectivity
try {
  mongoose.connect(DB_URL);
  console.log("coonected  to db");
} catch (error) {
  console.log(error);
}
//routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server run on ${PORT}`);
});
