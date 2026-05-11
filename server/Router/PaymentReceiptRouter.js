import express from "express";
import { Display, Register } from "../Controller/PaymentReceiptController.js";


export const paymentReceiptRouter = express.Router();

paymentReceiptRouter.post("/register",Register);
paymentReceiptRouter.get("/display",Display)
