import Parcel from "../Models/LandParcelModel.js";
import Transfer from "../Models/OwnershipTransferModel.js";
import Receipt from "../Models/PaymentReceiptModel.js";

// Insert LandOwner API Function

export const Register = async (req, res) => {
  try {
    const { transferId, amount_paid, payment_date, payment_method } = req.body;
    if (!transferId || !amount_paid || !payment_date || !payment_method) {
      return res.json({ success: false, message: "Sorry! Fill All Field" });
    }

    const fees = await Transfer.findById({_id:transferId})
   
    if(amount_paid != fees.transfer_fees){
      return res.json({success:false,message:`Sorry You Must Pay Only ${fees.transfer_fees}`})
    }

    const register = await Receipt.create({
      transferId,
      amount_paid,
      payment_date,
      payment_method,
    });

    await Parcel.findByIdAndUpdate(
      { _id: fees.parcelId },
      { land_owner_id: fees.new_ownerId },
    );

    return res.json({ success: true, message: "Your Payment Has Been Success And Land Transfer Created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Display Registed Person API Function

export const Display = async (req, res) => {
  try {
    const Person = await Receipt.find()
      .populate("transferId")
      .sort({ createdAt: -1 });
    return res.json({ success: true, Person });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
