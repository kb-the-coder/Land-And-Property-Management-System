import mongoose from "mongoose";

// Creating PaymentReceipt Schema

const PaymentReceiptSchema = mongoose.Schema(
  {
    tansferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ownershipTransfer",
    },
    amount_paid: { type: Number, required: true },
    payment_date: { type: Date, required: true },
    payment_method: { type: String, required: true },
  },
  { timestamps: true },
);

// Creating PaymentReceipt Model
const Receipt = mongoose.model("paymentReceipt", PaymentReceiptSchema);

export default Receipt;
