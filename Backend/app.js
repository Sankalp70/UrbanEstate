import express from "express";
import Postrouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", Postrouter);

app.use("/api/auth", authRouter);

app.listen(5000, () => {
  try {
    console.log("Server is Running");
  } catch (error) {
    console.error(error);
  }
});
