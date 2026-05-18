import express from "express"
import { Login, Register, verify } from "../Controller/UserController.js";
import { verifyUser } from "../Middleware/authUser.js";



export const userRouter = express.Router();

userRouter.post("/register",Register)
userRouter.post("/login", Login);
userRouter.get("/verify", verifyUser, verify);