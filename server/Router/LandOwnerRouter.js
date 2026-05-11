import express from "express";
import { Display, Register } from "../Controller/LandOwnerController.js";

export const landOwnerRouter = express.Router();

landOwnerRouter.post("/register",Register);
landOwnerRouter.get("/display",Display)
landOwnerRouter.get("/display/:id", Display);