import express from "express";
import { login, logout, register } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/register", register);

export default authRouter;
