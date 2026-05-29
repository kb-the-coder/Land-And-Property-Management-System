import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaCheckDouble,
  FaClone,
  FaDollarSign,
  FaExchangeAlt,
  FaMapMarkedAlt,
  FaMapPin,
  FaMountain,
  FaSitemap,
  FaTrademark,
  FaUsers,
} from "react-icons/fa";
import { MdWarning } from "react-icons/md";

const Dashboard = () => {
const [dataf, setDataf] = useState([
  {
    land: "PR0123",
    Old_Owner: "Pazzo",
    New_Owner: "Bonheur",
    fees: "3000",
    date: "2012-12-01",
  },
  {
    land: "PR0123",
    Old_Owner: "Pazzo",
    New_Owner: "Bonheur",
    fees: "3000",
    date: "2012-12-01",
  },
  {
    land: "PR0123",
    Old_Owner: "Pazzo",
    New_Owner: "Bonheur",
    fees: "3000",
    date: "2012-12-01",
  },
  {
    land: "PR0123",
    Old_Owner: "Pazzo",
    New_Owner: "Bonheur",
    fees: "3000",
    date: "2012-12-01",
  },
]);
const API_URL = "http://localhost:3400/api/owner";
  const API_URL_L = "http://localhost:3400/api/land";
  const API_URL_T = "http://localhost:3400/api/transfer";
  const [data, setData] = useState([]);
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
        console.log(res.data);
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
  console.log(unpaid)
  return (
    <div className="p-1 flex flex-col gap-2 w-full ">
      <div className="bg-white/50 rounded-md p-2">
        <h1 className="text-xl font-bold text-indigo-500">Dashboard</h1>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white/50 p-4 rounded-md">
        <div className="bg-cyan-500/10  p-2 rounded-lg flex justify-evenly items-center gap-2">
          <FaUsers className="text-3xl text-cyan-500" />
          <div className="">
            <h1 className=" text-cyan-500 font-semibold text-md">
              Total Owners
            </h1>
            <p className="text-center text-sm text-gray-500">{data.length}</p>
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
            <p className="text-center text-sm text-gray-500">{unpaid.length}</p>
          </div>
        </div>
      </div>
      <div className="bg-white/50 p-4 flex flex-col gap-2 rounded-lg">
        <div className="flex items-center gap-2 p-2 text-xl text-red-500">
          <MdWarning />
          <h1>Pedding Transfer</h1>
        </div>
        {unpaid.length == 0 ? (
          <p className="flex items-center justify-center gap-2 p-2 text-sm text-gray-500">
            There's No Pedding Transfer
          </p>
        ) : (
          <table className="rounded-t-2xl p-1">
            <thead className="">
              <tr className="bg-indigo-400 text-white/70">
                <th className="p-1">No</th>
                <th>Land</th>
                <th>Old Owner</th>
                <th>New Owner</th>
                <th>Fees</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {unpaid.map((i, x) => (
                <tr className="text-center hover:bg-indigo-300 cursor-pointer text-gray-900 font-extralight">
                  <td className="p-1">{x + 1}</td>
                  <td> {i.parcelId?.area_sqm} </td>
                  <td> {i.old_ownerId?.first_name} </td>
                  <td> {i.new_ownerId?.first_name} </td>
                  <td> {i.transfer_fees} </td>
                  <td> {new Date(i.transfer_date).toLocaleDateString()} </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
