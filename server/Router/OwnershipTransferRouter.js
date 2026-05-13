import express from "express";
import {
  Display,
  Register,
  RemoveTransfer,
  Update,
} from "../Controller/OwnershipTransferController.js";

export const ownershipTransferRouter = express.Router();

ownershipTransferRouter.post("/register", Register);
ownershipTransferRouter.get("/display", Display);
ownershipTransferRouter.put("/update/:id", Update);
ownershipTransferRouter.delete("/delete/:id", RemoveTransfer);