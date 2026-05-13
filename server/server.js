import express from "express";
import cors from "cors";
import "dotenv/config";
import db_conn from "./Config/db.js";
import { landOwnerRouter } from "./Router/LandOwnerRouter.js";
import { landParcelRouter } from "./Router/LandParcelRoute.js";
import { ownershipTransferRouter } from "./Router/OwnershipTransferRouter.js";
import { paymentReceiptRouter } from "./Router/PaymentReceiptRouter.js";
import { userRouter } from "./Router/UserRouter.js";

// Prepare Express Enviroment Function
const app = express();
app.use(express.json());

// Declare Cors : Allowed Client Connection
const client_url = [process.env.CLIENT_URL];
app.use(
  cors({
    origin: client_url,
    credentials: true,
  }),
);

// Listen Server API Running PORT/URL
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Running Success On http://localhost:${port}`);
});

// Declare Database Connection Function
db_conn();

// Test Server API Router
app.get("/", (req, res) => {
  res.send("Server API Working Well");
});

// API Routes
app.use("/api/user",userRouter)
app.use("/api/owner", landOwnerRouter);
app.use("/api/land", landParcelRouter);
app.use("/api/transfer", ownershipTransferRouter);
app.use("/api/receipt", paymentReceiptRouter);
