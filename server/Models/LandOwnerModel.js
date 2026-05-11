import mongoose from "mongoose";

// Creating LandOwner Schema

const LandOwnerSchema = mongoose.Schema({
  nationalId: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  telephone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
},{timestamps:true});

// Creating LandOwner Model
const Owner = mongoose.model("landOwner", LandOwnerSchema);

export default Owner;
