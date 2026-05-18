import Parcel from "../Models/LandParcelModel.js";
import Transfer from "../Models/OwnershipTransferModel.js";
import Receipt from "../Models/PaymentReceiptModel.js";

// Calculate Transfer Function

const transferFees = (area_sqm, transfer_reason) => {
  let transfer_fees = 0;
  if (area_sqm > 500) {
    transfer_fees += area_sqm * 800;
  }
  transfer_fees += area_sqm * 500;

  if (transfer_reason == "inheritance") {
    transfer_fees = (transfer_fees * 20) / 100;
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
      !transfer_date ||
      !old_ownerId ||
      !new_ownerId ||
      !transfer_reason
    ) {
      return res.json({ success: false, message: "Sorry! Fill All Field" });
    }

    if(old_ownerId == new_ownerId){
      return res.json({success:false,message:"This Is Already Your Land"})
    }

    const landSqm = await Parcel.findById({ _id: parcelId });

    if (landSqm.land_owner_id != old_ownerId) {
      return res.json({succcess:false,message:"This is Not Owner Of this Land"});
    }

    if (
      landSqm.parcel_status == "not for sale" 
    ) {
      return res.json({
        success: false,
        message:
          "Land Can Be Transfer Only has For Sale or Available Status Update Status And Retry ",
      });
    }

    const checkPay =await Transfer.findOne({ parcelId: parcelId });

    if(checkPay?.paid_status == "pedding"){
      return res.json({success:false,message:"Your Not Allowed To Give Your Land if it's transfer pedding"})
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

    return res.json({ success: true, message: "Land Transfer Declare Success Pay it on Payment Form to be Transfered" });
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

        if (old_ownerId == new_ownerId) {
          return res.json({
            success: false,
            message: "This Is Already Your Land",
          });
        }

        const landSqm = await Transfer.findById({ _id: id });


        if (landSqm.old_ownerId != old_ownerId) {
          return res.json({
            succcess: false,
            message: "This is Not Owner Of this Land",
          });
        }

        if (landSqm.parcel_status == "not for sale") {
          return res.json({
            success: false,
            message:
              "Land Can Be Transfer Only has For Sale or Available Status Update Status And Retry ",
          });
        }

    const transfer = await Transfer.findById({ _id: id });

    if(transfer.paid_status == "paid"){
      return res.json({success:false,message:"You can't Updated Transfer Declaration"})
    }
    const parcel = await Parcel.findById({_id:transfer.parcelId})
    if (transfer_reason) {
      if (transfer_reason != "inheritance") {
        
        let fees = (transfer.transfer_fees * 100) / 20;
        if (parcel.area_sqm * 500 != fees || parcel.area_sqm * 800 != fees){
          fees = transferFees(parcel.area_sqm, transfer_reason);
        }
          await Transfer.findByIdAndUpdate(
            { _id: id },
            {
              parcelId,
              transfer_date,
              old_ownerId,
              new_ownerId,
              transfer_fees: fees,
              transfer_reason,
            },
          );
        return res.json({ succcess: true, message: "Tranfer Update Success" });
      }
    }
    const fees = transferFees(parcel.area_sqm,transfer_reason)
     await Transfer.findByIdAndUpdate(
            { _id: id },
            {
              parcelId,
              transfer_date,
              old_ownerId,
              new_ownerId,
              transfer_fees: fees,
              transfer_reason
            },)
            return res.json({
              succcess: true,
              message: "Tranfer Update Success",
            });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete Transfer

export const RemoveTransfer = async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await Transfer.findByIdAndDelete({ _id: id });
    return res.json({
      success: true,
      message:
        "Transfer Delete Success If You do Payment Receipt Before Make Transfer Wont be Done",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
