import Parcel from "../Models/LandParcelModel.js";
import Transfer from "../Models/OwnershipTransferModel.js";

// Calculate Transfer Function

const transferFees = (area_sqm, transfer_reason) => {
  let transfer_fees = 0;
  if (area_sqm > 500) {
    transfer_fees += landSqm.area_sqm * 800;
  }
  transfer_fees += landSqm.area_sqm * 500;

  if (transfer_reason == "inheritance") {
    (transfer_fees * 20) / 100;
  }

  return transfer_fees;
};

// Insert LandOwner API Function

export const Register = async (req, res) => {
  try {
    const {
      parcelId,
      transfer_date,
      old_ownerId,
      new_ownerId,
      transfer_reason,
    } = req.body;
    if (
      !parcelId ||
      transfer_date ||
      old_ownerId ||
      new_ownerId ||
      transfer_reason
    ) {
      return res.json({ success: false, message: "Sorry! Fill All Field" });
    }

    const landSqm = Parcel.findById({ _id: parcelId });

    if (
      landSqm.parcel_status !== "for sale" ||
      landSqm.parcel_status !== "available"
    ) {
      return res.json({
        success: false,
        message:
          "Land Can Be Transfer Only has For Sale or Available Status Update Status And Retry ",
      });
    }

    const transfer_fees = transferFees(landSqm.area_sqm, transfer_reason);

    const register = await Transfer.create({
      parcelId,
      transfer_date,
      old_ownerId,
      new_ownerId,
      transfer_fees,
      transfer_reason,
    });

    return res.json({ success: true, message: "Land Transfered Success" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Display Registed Person API Function

export const Display = async (req, res) => {
  try {
    const transfer = await Transfer.find()
      .populate(["parcelId", "old_ownerId", "new_ownerId"])
      .sort({ createdAt: -1 });
    return res.json({ success: true, transfer });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      parcelId,
      transfer_date,
      old_ownerId,
      new_ownerId,
      transfer_reason,
    } = req.body;

    const transfer = await Transfer.findById({ _id: id });
    if (transfer_reason) {
      if (transfer_reason !== "inheritance") {
        const fees = (transfer.transfer_fees * 100) / 20;
        await Transfer.findByIdAndUpdate({
          parcelId,
          transfer_date,
          old_ownerId,
          new_ownerId,
          transfer_fees: fees,
          transfer_reason,
        });
        return res.json({ succcess: true, message: "Tranfer Update Success" });
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete Transfer

export const RemoveTransfer = async (req, res) => {
  try {
    const { id } = req.params;
    const remove = findByIdAndDelete({ _id: id });
    return res.json({
      success: true,
      message:
        "Transfer Delete Success If You do Payment Receipt Before Make Transfer Wont be Done",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
