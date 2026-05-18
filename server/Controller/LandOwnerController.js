import { trusted } from "mongoose";
import Owner from "../Models/LandOwnerModel.js";

// Insert LandOwner API Function

export const Register = async (req, res) => {
  try {
    const { nationalId, first_name, last_name, email, telephone, address } =
      req.body;
    if (
      !nationalId ||
      !first_name ||
      !last_name ||
      !email ||
      !telephone ||
      !address
    ) {
      return res.json({ success: false, message: "Sorry! Fill All Field" });
    }
    const person = await Owner.findOne({ nationalId });
    if (person) {
      return res.json({
        success: false,
        message: "Sorry! Already Person Registed",
      });
    }

    const register = await Owner.create({
      nationalId,
      first_name,
      last_name,
      email,
      telephone,
      address,
    });

    return res.json({ success: true, message: "Person Registration Success" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Display Registed Person API Function

export const Display = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const p = await Owner.findById({ _id: id });
      return res.json({ success: true, p });
    }
    const Person = await Owner.find().sort({ createdAt: -1 });
    return res.json({ success: true, Person });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


