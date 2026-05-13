import mongoose from "mongoose";

// Creating OwnershipTransfer Schema

const OwnershipTransferSchema = mongoose.Schema(
  {
    parcelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "landParcel",
      required: true,
    },
    transfer_date: { type: Date, required: true },
    old_ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "landOwner" },
    new_ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "landOwner" },
    transfer_fees: { type: Number, required: true },
    transfer_reason: { type: String },
    paid_status: { type: String,enum:["paid","pedding"],default:"pedding" },
  },
  { timestamps: true },
);

// Creating OwnershipTransfer Model
const Transfer = mongoose.model("ownershipTransfer", OwnershipTransferSchema);

export default Transfer;
