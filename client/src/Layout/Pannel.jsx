import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaAtlas, FaBars, FaBone, FaBroadcastTower, FaExchangeAlt, FaHome, FaHouseUser, FaLandmark, FaMapMarked, FaMapMarkedAlt, FaMapMarker, FaMapMarkerAlt, FaMapPin, FaMapSigns, FaRegHandPointRight, FaUser, FaUserAlt, FaUserEdit } from 'react-icons/fa'
import { MdAnalytics, MdCopyAll, MdDashboard, MdDocumentScanner, MdEditDocument, MdLogout, MdOutlineAnalytics, MdOutlineAppRegistration, MdPages, MdPayment, MdReceipt, MdReport } from "react-icons/md";

const Pannel = () => {
  const nav = useNavigate()
    const [menu,setMenu] = useState(false)
    const Out = ()=>{
      nav("/login")
    }
  return (
    <div>
      <div className="flex gap-2 w-full min-h-screen">
        <div
          className={`hidden  w-64 min-h-screen rounded-lg p-2 bg-indigo-400 md:flex md:flex-col gap-4`}
        >
          <div className="flex items-center gap-2 bg-white p-4 rounded-md">
            <FaAtlas className="text-lg text-indigo-500 font-bold" />
            <h1 className="text-lg text-indigo-500 font-bold">PRMS</h1>
          </div>
          <ul className="flex flex-col  gap-2 w-full">
            <li>
              <NavLink
                to="/"
                title="Dashboard"
                className="flex items-center gap-2 text-lg font-semibold text-white/70 hover:bg-white/50 hover:text-indigo-500 rounded-md p-2"
              >
                <MdDashboard className="text-3xl text-white p-0.5 rounded-md" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="owner"
                title="Owners"
                className="flex items-center gap-2 text-lg font-semibold text-white/70 hover:bg-white/50 hover:text-indigo-500 rounded-md p-2"
              >
                <FaUserEdit className="text-3xl text-white  p-0.5 rounded-md" />
                <p>Land Owners</p>
              </NavLink>
            </li>
            <li>
              <NavLink className="flex items-center gap-2 text-lg font-semibold text-white/70 hover:bg-white/50 hover:text-indigo-500 rounded-md p-2">
                <FaMapSigns className="text-3xl text-white  p-0.5 rounded-md" />
                <p>Land Parcel</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="transfer"
                title="Transfer"
                className="flex items-center gap-2 text-lg font-semibold text-white/70 hover:bg-white/50 hover:text-indigo-500 rounded-md p-2"
              >
                <FaExchangeAlt className="text-3xl text-white  p-0.5 rounded-md" />
                <p>Ownership Transfer</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="payment"
                title="Payment"
                className="flex items-center gap-2 text-lg font-semibold text-white/70 hover:bg-white/50 hover:text-indigo-500 rounded-md p-2"
              >
                <MdPayment className="text-3xl text-white  p-0.5 rounded-md" />
                <p>Payment Receipt</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="report"
                title="Report"
                className="flex items-center gap-2 text-lg font-semibold text-white/70 hover:bg-white/50 hover:text-indigo-500 rounded-md p-2"
              >
                <MdOutlineAnalytics className="text-3xl text-white  p-0.5 rounded-md" />
                <p>Report</p>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 bg-indigo-200 rounded-lg p-2">
          <div className="flex justify-between items-center p-4 rounded-md bg-white">
            <div className="">
              <h1 className="text-sm md:text-lg font-bold text-indigo-500">
                Land & Property Registration
              </h1>
            </div>
            <div className="flex gap-2 items-center ">
              <div className="flex items-center gap-2 bg-gray-500/50 p-1 rounded-lg">
                <FaUser className="bg-indigo-500/50 text-3xl p-1 rounded-full" />
                <p className="text-md font-semibold text-indigo-500">Admin</p>
              </div>
              <div className="">
                <MdLogout
                  onClick={Out}
                  className="bg-red-400 text-white font-semibold text-4xl p-2 cursor-pointer rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="md:hidden bg-indigo-400 w-full p-2 rounded-md flex justify-center items-center">
            <ul className="flex justify-evenly w-full items-center">
              <li>
                <NavLink to="/" title="Dashboard">
                  <MdDashboard className="text-3xl text-white hover:bg-indigo-600 p-0.5 rounded-md" />
                </NavLink>
              </li>
              <li>
                <NavLink to="owner" title="Owners">
                  <FaUserEdit className="text-3xl text-white hover:bg-indigo-600 p-0.5 rounded-md" />
                </NavLink>
              </li>
              <li>
                <NavLink to="land" title="Land">
                  <FaMapSigns className="text-3xl text-white hover:bg-indigo-600 p-0.5 rounded-md" />
                </NavLink>
              </li>
              <li>
                <NavLink to="transfer" title="Transfer">
                  <FaExchangeAlt className="text-3xl text-white hover:bg-indigo-600 p-0.5 rounded-md" />
                </NavLink>
              </li>
              <li>
                <NavLink to="payment" title="Payment">
                  <MdPayment className="text-3xl text-white hover:bg-indigo-600 p-0.5 rounded-md" />
                </NavLink>
              </li>
              <li>
                <NavLink to="report" title="Report">
                  <MdEditDocument className="text-3xl text-white hover:bg-indigo-600 p-0.5 rounded-md" />
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pannel