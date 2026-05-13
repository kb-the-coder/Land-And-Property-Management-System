import Parcel from "../Models/LandParcelModel.js";

// Insert LandOwner API Function

export const Register = async (req, res) => {
  try {
    const { area_sqm, location, parcel_status, land_use_type, land_owner_id } =
      req.body;
    if (
      !area_sqm ||
      !location ||
      !parcel_status ||
      !land_use_type ||
      !land_owner_id
    ) {
      return res.json({ success: false, message: "Sorry! Fill All Field" });
    }

    const register = await Parcel.create({
      area_sqm,
      location,
      parcel_status,
      land_use_type,
      land_owner_id,
    });

    return res.json({ success: true, message: "Land Registration Success" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Display Registed Person API Function

export const Display = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const parcel = await Parcel.findById({ _id: id }).populate(
        "land_owner_id",
      );
      return res.json({ success: true, parcel });
    }
    const Land = await Parcel.find()
      .populate("land_owner_id")
      .sort({ createdAt: -1 });
    return res.json({ success: true, Land });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


