import express from "express"
import { Login, Register } from "../Controller/UserController.js";


export const userRouter = express.Router();

userRouter.post("/register",Register)
userRouter.post("/login", Login);