import express from "express";
import { Display, Register } from "../Controller/LandParcelController.js";


export const landParcelRouter = express.Router();

landParcelRouter.post("/register",Register);
landParcelRouter.get("/display",Display)
landParcelRouter.get("/display/:id", Display);