import React, { useEffect, useState } from "react";
import {
  FaClosedCaptioning,
  FaPlus,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const Transfer = () => {
  const API_URL = "http://localhost:3400/api/owner";
  const API_URL_L = "http://localhost:3400/api/land";
  const API_URL_T = "http://localhost:3400/api/transfer";
  const [data, setData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [landData, setLandData] = useState([]);
  const [model, setModel] = useState(false);
  const [old_owner, setOldOwner] = useState(null);
  const [area, setArea] = useState(0);
  const [edit, setEdit] = useState(null);
  const [formData, setFormData] = useState({
    parcelId: "",
    transfer_date: "",
    old_ownerId: "",
    new_ownerId: "",
    transfer_reason: "",
  });
  const handleFormData = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fecthDataL = async () => {
    try {
      const res = await axios.get(`${API_URL_L}/display`);
      if (!res.data.success) {
        return toast.error(res.data.message);
      }
      setLandData(res.data.Land);
    } catch (error) {
      alert(error.message);
    }
  };

  const fecthDataLo = async () => {
    try {
      const res = await axios.get(`${API_URL_L}/display/${formData.parcelId}`);
      if (!res.data.success) {
        return toast.error(res.data.message);
      }
      setArea(res.data.parcel);
      setOldOwner(
        `${res.data.parcel?.land_owner_id.first_name || "Select Land"} ${res.data.parcel?.land_owner_id.last_name || ""}`,
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const fecthData = async () => {
    try {
      const res = await axios.get(`${API_URL}/display`);
      if (!res.data.success) {
        return toast.error(res.data.message);
      }
      setData(res.data.Person);
    } catch (error) {
      alert(error.message);
    }
  };

  const fecthDataT = async () => {
    try {
      const res = await axios.get(`${API_URL_T}/display`);
      if (!res.data.success) {
        return toast.error(res.data.message);
      }
      setTransferData(res.data.transfer);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.parcelId ||
        !formData.transfer_date ||
        !formData.new_ownerId ||
        !formData.old_ownerId ||
        !formData.transfer_reason
      ) {
        return toast.error("You Must Fill all Field");
      }
      if (edit) {
        const res = await axios.put(`${API_URL_T}/update/${edit}`, formData);
        if (!res) {
          return toast.error(res.data.message);
        }
        setModel(false)
        toast.success(res.data.message);
        setFormData({
          parcelId: "",
          transfer_date: "",
          old_ownerId: "",
          new_ownerId: "",
          transfer_reason: "",
        });
        return;
      }

      const res = await axios.post(`${API_URL_T}/register`, formData);
      if (!res.data.success) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message);
      setFormData({
        parcelId: "",
        transfer_date: "",
        old_ownerId: "",
        new_ownerId: "",
        transfer_reason: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fecthDataLo();
  }, [formData]);

  useEffect(() => {
    fecthDataT();
    fecthData();
    fecthDataL();
  }, [formData]);

  const handleUpdate = (o) => {
    setModel(true);
    setFormData({
      parcelId: o.parcelId?._id,
      transfer_date: o.transfer_date,
      old_ownerId: o.old_ownerId?._id,
      new_ownerId: o.new_ownerId._id,
      transfer_reason: o.transfer_reason,
    });
    setEdit(o._id);
  };

  const handleRemove = async(id)=>{
    try {
      if(!confirm("Are You Sure You want To Delete Tranfer Record")) return;
      const res =await axios.delete(`${API_URL_T}/delete/${id}`)
      if(!res.data.success){
        return toast.error(res.data.message)
      }
      fecthDataT()
      return toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

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
  return (
    <div className="p-1 flex flex-col gap-2 w-full ">
      <div className="bg-white/50 rounded-md px-4 py-2 flex justify-between items-center">
        <h1 className="md:text-xl font-bold text-indigo-500 text-md">
          Transfer Ownership Application
        </h1>
        <div
          className="p-2 text-white/90 rounded-lg bg-green-500 flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setModel(true);
          }}
        >
          <FaPlus /> <p className="md:block hidden">Declare Transfer</p>
        </div>
      </div>
      <div className="bg-white/50 p-4 rounded-lg block md:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {transferData.map((o, i) => (
            <div className="w-full bg-white p-2 rounded-lg" key={i}>
              <h1 className="text-gray-500">{i + 1}</h1>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Land:</h1>
                <p className="text-gray-800">
                  {" "}
                  <b>RW{o.parcelId.area_sqm}S/M</b>
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">
                  Transfer Date:
                </h1>
                <p className="text-gray-800 capitalize">
                  {new Date(o.transfer_date).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500 capitalize">
                  Old Owner:
                </h1>
                <p className="text-gray-800">{o.old_ownerId?.first_name}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500 capitalize">
                  New Owner:
                </h1>
                <p className="text-gray-800 capitalize">
                  {o.new_ownerId?.first_name}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">
                  Transfer Fees:
                </h1>
                <p className="text-gray-800 capitalize">
                  {o.transfer_fees.toLocaleString()} FRW
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">
                  Transfer Reason:
                </h1>
                <p className="text-gray-800 capitalize">{o.transfer_reason}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">
                  Payment Status
                </h1>
                <p className="text-gray-800 capitalize">{o.paid_status}</p>
              </div>
              <div className="flex gap-2 items-center justify-evenly py-2">
                <button className="w-50 py-1 bg-blue-500 rounded-lg text-md font-semibold text-white/90">
                  Update
                </button>
                <button className="w-50 py-1 bg-red-500 rounded-lg text-white/90 font-semibold text-md">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/50 p-4 md:flex flex-col gap-2 rounded-lg hidden ">
        <div className="bg-white p-2 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-indigo-500">
                <th>No</th>
                <th>Land</th>
                <th>Transfer Date</th>
                <th>Old Owner</th>
                <th>New Owner</th>
                <th>Transfer fees</th>
                <th>Transfer Reason</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transferData.map((o, i) => (
                <tr key={i} className="text-sm text-center capitalize">
                  <td className="px-2 p-2">{i + 1}</td>
                  <td className="px-2">RW{o.parcelId?.area_sqm}S/M</td>
                  <td className="px-2">
                    {new Date(o.transfer_date).toLocaleDateString()}
                  </td>
                  <td className="px-2 capitalize">
                    {o.old_ownerId?.first_name}
                  </td>
                  <td className="px-2 capitalize">
                    {o.new_ownerId?.first_name}
                  </td>
                  <td className="px-2">
                    {o.transfer_fees.toLocaleString()}{" "}
                    <i className="font-extralight">FRW</i>
                  </td>
                  <td className="px-2 capitalize">{o.transfer_reason}</td>
                  <td className="px-2 capitalize">{o.paid_status}</td>
                  <td>
                    <div className="flex gap-2 items-center justify-center py-2 text-lg">
                      <MdEdit
                        onClick={() => handleUpdate(o)}
                        className="hover:bg-gray-200 text-2xl p-1 rounded-full cursor-pointer text-blue-500"
                      />
                      <MdDelete
                        onClick={() => handleRemove(o._id)}
                        className="hover:bg-gray-200 text-2xl p-1 rounded-full cursor-pointer  text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {model && (
        <div
          className="fixed flex items-center justify-center bg-indigo-500/35 w-full inset-0"
          onClick={() => {
            setModel(false);
          }}
        >
          <div
            className="bg-white/95 w-120 p-4 rounded-2xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex
                    flex-col gap-4 w-full"
            >
              <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-semibold text-green-500">
                  Transfer Application Form
                </h1>
                <div
                  className=""
                  onClick={() => {
                    setModel(false);
                  }}
                >
                  <FaTimesCircle className="text-3xl text-indigo-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="parcelId"
                    className="font-semibold text-md text-blue-400"
                  >
                    Land
                  </label>
                  <select
                    value={formData.parcelId}
                    onChange={handleFormData}
                    name="parcelId"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  >
                    <option value="">Select Land</option>
                    {landData.map((o, i) => (
                      <option key={i} value={o._id}>
                        RW{o.area_sqm}S/M
                      </option>
                    ))}
                  </select>
                  {area && (
                    <p className="text-sm font-extralight text-indigo-500">
                      Land Belongs to{" "}
                      <b>
                        {" "}
                        {area.land_owner_id.first_name}{" "}
                        {area.land_owner_id.last_name}
                      </b>
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="transfer_date"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Transfer Date
                  </label>
                  <input
                    value={formData.transfer_date}
                    onChange={handleFormData}
                    type="datetime-local"
                    name="transfer_date"
                    placeholder="Kigali-Rwanda"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="land_use_type"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Old Owner
                  </label>
                  <select
                    value={formData.old_ownerId}
                    onChange={handleFormData}
                    name="old_ownerId"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  >
                    <option value="">Select New Owner</option>

                    <option value={area ? area?.land_owner_id._id : ""}>
                      {area ? area.land_owner_id.first_name : ""}{" "}
                      {area
                        ? area.land_owner_id.last_name
                        : "Not Owner this land"}
                    </option>
                    {console.log(area ? area?.land_owner_id._id : "")}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="parcel_status"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Land Status
                  </label>
                  <select
                    value={formData.new_ownerId}
                    onChange={handleFormData}
                    name="new_ownerId"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  >
                    <option value="">Select New Owner</option>
                    {data.map((o, i) => (
                      <option key={i} value={o._id}>
                        {o.first_name} {o.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="transfer_reason"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Reason
                  </label>
                  <select
                    value={formData.transfer_reason}
                    onChange={handleFormData}
                    name="transfer_reason"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  >
                    <option value="">Select Owner</option>
                    <option value="inheritance">
                      Inheritance (20% Discount)
                    </option>
                    <option value="sale">Sale</option>
                    <option value="reclaimation">Reclaimation</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="transfer_fees"
                  className="font-semibold text-md text-blue-400"
                >
                  Transfer Fees
                </label>
                <p className="text-xl p-2 w-50 rounded-md bg-green-400 text-white font-semibold">
                  {transferFees(area?.area_sqm, formData?.transfer_reason)
                    ? transferFees(
                        area?.area_sqm,
                        formData?.transfer_reason,
                      ).toLocaleString()
                    : "0"}{" "}
                  RFW
                </p>
              </div>
              <button
                type="submit"
                className="bg-green-500 p-2 text-white/90 font-semibold rounded-md hover:rounded-2xl"
              >
                Register Land
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transfer;
