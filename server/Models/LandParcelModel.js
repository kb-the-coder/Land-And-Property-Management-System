import mongoose from "mongoose";

// Creating LandParcel Shcema
const LandParcelSchema = mongoose.Schema(
  {
    area_sqm: { type: Number, required: true },
    location: { type: String, required: true },
    parcel_status: {
      type: String,
      enum: ["for sale", "not for sale","available"],
      default:"available",
      required: true,
    },
    land_use_type: { type: String, required: true },
    land_owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "landOwner" },
  },
  { timestamps: true },
);

// Creating Model
const Parcel = mongoose.model("landParcel", LandParcelSchema);

export default Parcel;
