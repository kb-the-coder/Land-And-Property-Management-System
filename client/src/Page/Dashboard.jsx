import React, { useState } from "react";
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
const [data, setData] = useState([
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
            <p className="text-center text-sm text-gray-500">10</p>
          </div>
        </div>
        <div className="bg-amber-500/10  p-2 rounded-lg flex justify-evenly items-center gap-2">
          <FaMapMarkedAlt className="text-3xl text-amber-500" />
          <div className="">
            <h1 className=" text-amber-500 font-semibold text-md">
              Total Parcel
            </h1>
            <p className="text-center text-sm text-gray-500">10</p>
          </div>
        </div>
        <div className="bg-green-500/10  p-2 rounded-lg flex justify-evenly items-center gap-2">
          <FaExchangeAlt className="text-3xl text-green-500" />
          <div className="">
            <h1 className=" text-green-500 font-semibold text-md">
              Total Transfer
            </h1>
            <p className="text-center text-sm text-gray-500">10</p>
          </div>
        </div>
        <div className="bg-red-500/10  p-2 rounded-lg flex justify-evenly items-center gap-2">
          <MdWarning className="text-3xl text-red-500" />
          <div className="">
            <h1 className=" text-red-500 font-semibold text-md">
              Unpaid Transfer
            </h1>
            <p className="text-center text-sm text-gray-500">10</p>
          </div>
        </div>
      </div>
      <div className="bg-white/50 p-4 flex flex-col gap-2 rounded-lg">
        <h1 className="p-2 text-xl text-indigo-500">Recent Activity</h1>
        <div className="bg-green-500/10 px-2 py-1 rounded-lg">
          <h1 className="text-green-500 font-semibold">Ownership Transfer</h1>
          <div className="text-sm text-gray-500">
            Bosco's land( PR0021 ) Transfer To Alice{" "}
          </div>
        </div>
        <div className="bg-amber-500/10 px-2 py-1 rounded-lg">
          <h1 className="text-amber-500 font-semibold">Land Register</h1>
          <div className="text-sm text-gray-500">
            Land ( PR710 ) Register To Pazzo{" "}
          </div>
        </div>
        <div className="bg-green-500/10 px-2 py-1 rounded-lg">
          <h1 className="text-green-500 font-semibold">Ownership Transfer</h1>
          <div className="text-sm text-gray-500">
            Land( PR0021 ) Register To Pazzo{" "}
          </div>
        </div>
        <div className="bg-yellow-500/10 px-2 py-1 rounded-lg">
          <h1 className="text-yellow-500 font-semibold">Transfer Payment</h1>
          <div className="text-sm text-gray-500">
            Bosco & Alice land Transfer Successful Paid{" "}
          </div>
        </div>
      </div>
      <div className="bg-white/50 p-4 flex flex-col gap-2 rounded-lg">
        <div className="flex items-center gap-2 p-2 text-xl text-red-500">
          <MdWarning />
          <h1>Pedding Transfer</h1>
        </div>
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
            {data.map((i, x) => (
              <tr className="text-center hover:bg-indigo-300 cursor-pointer text-gray-900 font-extralight">
                <td className="p-1">{x + 1}</td>
                <td> {i.land} </td>
                <td> {i.Old_Owner} </td>
                <td> {i.New_Owner} </td>
                <td> {i.fees} </td>
                <td> {i.date} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
