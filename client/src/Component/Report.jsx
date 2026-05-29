import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExchangeAlt, FaMapMarkedAlt, FaUsers } from "react-icons/fa";
import { MdWarning } from "react-icons/md";

const Report = () => {
  const API_URL = "http://localhost:3400/api/owner";
  const API_URL_L = "http://localhost:3400/api/land";
  const API_URL_T = "http://localhost:3400/api/transfer";
  const API_URL_R = "http://localhost:3400/api/receipt";
  const [data, setData] = useState([]);
  const [datar, setDatar] = useState([]);
  const [landData, setLandData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  
  useEffect(() => {
    const fecthData = async () => {
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
      const fecthDatar = async () => {
      try {
        const res = await axios.get(`${API_URL_R}/display`);
        if (!res.data.success) {
          return toast.error(res.data.message);
        }
        setDatar(res.data.Person);
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
            alert(error.message);
          }
        };
        fecthDatar()
        fecthDataT()
    fecthData();
  }, []);

  useEffect(() => {
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
    fecthData();
  }, []);
  const unpaid = transferData.filter((o) => o.paid_status != "paid");

  const report = data.map((o)=>{
    const lo = landData.filter((p) => p.land_owner_id?._id == o._id)
    const parc =landData.filter((p) => p.land_owner_id?._id == o._id)
    const pay = datar.filter((r)=>r.transferId?.new_ownerId == o._id)
    const tra = transferData.filter((t) => t.new_ownerId?._id == o._id)
    return {
      OwnerId: o.nationalId,
      FirstName: o.first_name,
      LastName: o.last_name,
      ParcelNumber: lo.length == 0 ? "Don't Have Land" : lo[0]?._id,
      Location: lo.length == 0 ? "Don't Have Land" : lo[0]?.location,
      AreaSqm: lo.length == 0 ? "Don't Have Land" : lo[0]?.area_sqm,
      TransferDate: tra.length == 0 ? "Not Tranfered" : (new Date(tra[0]?.transfer_date).toLocaleDateString()),
      AmountPaid: pay.length == 0 ? "Not Transfered" : pay[0]?.amount_paid,
    };
  })

  return (
    <div>
      <div className="p-1 flex flex-col gap-2 w-full">
        <div className="bg-white/40 rounded-sm px-4 py-2 flex justify-between items-center">
          <h1 className="md:text-xl font-bold text-indigo-500 text-md">
            Report Analysis
          </h1>
        </div>
        <div className="">
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white/50 p-4 rounded-md">
            <div className="bg-cyan-500/10  p-2 rounded-lg flex justify-evenly items-center gap-2">
              <FaUsers className="text-3xl text-cyan-500" />
              <div className="">
                <h1 className=" text-cyan-500 font-semibold text-md">
                  Total Owners
                </h1>
                <p className="text-center text-sm text-gray-500">
                  {data.length}
                </p>
              </div>
            </div>
            <div className="bg-amber-500/10  p-2 rounded-lg flex justify-evenly items-center gap-2">
              <FaMapMarkedAlt className="text-3xl text-amber-500" />
              <div className="">
                <h1 className=" text-amber-500 font-semibold text-md">
                  Total Parcel
                </h1>
                <p className="text-center text-sm text-gray-500">
                  {landData.length}
                </p>
              </div>
            </div>
            <div className="bg-green-500/10  p-2 rounded-lg flex justify-evenly items-center gap-2">
              <FaExchangeAlt className="text-3xl text-green-500" />
              <div className="">
                <h1 className=" text-green-500 font-semibold text-md">
                  Total Transfer
                </h1>
                <p className="text-center text-sm text-gray-500">
                  {transferData.length}
                </p>
              </div>
            </div>
            <div className="bg-red-500/10  p-2 rounded-lg flex justify-evenly items-center gap-2">
              <MdWarning className="text-3xl text-red-500" />
              <div className="">
                <h1 className=" text-red-500 font-semibold text-md">
                  Unpaid Transfer
                </h1>
                <p className="text-center text-sm text-gray-500">
                  {unpaid.length}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/50 p-4 rounded-lg block md:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {report.map((o, i) => (
              <div className="w-full bg-white p-2 rounded-lg" key={i}>
                <h1 className="text-gray-500">{i + 1}</h1>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">Owner</h1>
                  <p className="text-gray-800">{o.OwnerId}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">FirstName:</h1>
                  <p className="text-gray-800">{o.FirstName}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">LastName:</h1>
                  <p className="text-gray-800 capitalize">{o.LastName}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">
                    ParcelNumber:
                  </h1>
                  <p className="text-gray-800">{o.ParcelNumber}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">Location:</h1>
                  <p className="text-gray-800">{o.Location}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">
                    Area Per Square
                  </h1>
                  <p className="text-gray-800">{o.AreaSqm}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">
                    TransferDate:
                  </h1>
                  <p className="text-gray-800">{o.TransferDate}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">
                    Amount Paid:
                  </h1>
                  <p className="text-gray-800">{o.AmountPaid}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/50 p-4 md:flex flex-col gap-2 rounded-lg hidden ">
          <div className="bg-white p-2 rounded-lg">
            <table className="w-full ">
              <thead>
                <tr className="text-sm text-indigo-500">
                  <th>No</th>
                  <th>Owner</th>
                  <th>Full Name</th>
                  <th>Parcel</th>
                  <th>SpM</th>
                  <th>Location</th>
                  <th>TransferDate</th>
                  <th>Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {report.map((o, i) => (
                  <tr key={i} className="text-sm text-center capitalize">
                    <td className="px-2 p-2">{i + 1}</td>
                    <td className="px-2">{o.OwnerId}</td>
                    <td className="px-2">{o.FirstName} {o.LastName} </td>
                    <td className="px-2">{o.ParcelNumber}</td>
                    <td className="px-2">{o.AreaSqm}</td>
                    <td className="px-2">{o.Location}</td>
                    <td className="px-2">{o.TransferDate}</td>
                    <td className="px-2">{o.AmountPaid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
