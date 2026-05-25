import React, { useEffect, useState } from "react";
import {
  FaCertificate,
  FaClosedCaptioning,
  FaMarker,
  FaPlus,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { MdCelebration, MdMarkEmailRead } from "react-icons/md";

const Receipt = () => {
    const API_URL = "http://localhost:3400/api/owner";
    const API_URL_L = "http://localhost:3400/api/land";
    const API_URL_T = "http://localhost:3400/api/transfer";
    const API_URL_R = "http://localhost:3400/api/receipt";
    const [data, setData] = useState([]);
    const [dataR, setDataR] = useState([]);
    const [dataT, setDataT] = useState([]);
    const [landData,setLandData] = useState([])
    const [model, setModel] = useState(false);
    const [certicateModel, setCerticateModel] = useState(false);
    const [formData, setFormData] = useState({
      transferId: "",
      amount_paid: "",
      payment_date: "",
      payment_method: ""
    });
  
     
    const handleFormData = async (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      try {
        if (
          !formData.transferId ||
          !formData.amount_paid ||
          !formData.payment_date ||
          !formData.payment_method
          
        ) {
          return toast.error("You Must Fill all Field");
        }
  
        const res = await axios.post(`${API_URL_R}/register`, formData);
        if (!res.data.success) {
          return toast.error(res.data.message);
        }
        toast.success(res.data.message);
        setFormData({
          transferId: "",
          amount_paid: "",
          payment_date: "",
          payment_method: "",
        });
      } catch (error) {
        toast.error(error.message);
      }
    };
    
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
      fecthData();
    }, [formData]);
  
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
         const fecthDataR = async () => {
           try {
             const res = await axios.get(`${API_URL_R}/display`);
             if (!res.data.success) {
               return toast.error(res.data.message);
             }
             console.log(res.data)
             setDataR(res.data.Person);
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
              console.log(res.data);
              setDataT(res.data.transfer);
            } catch (error) {
              alert(error.message);
            }
          };
          fecthDataT()
         fecthDataR();
        fecthData();
      }, [formData]);
  
  return (
    <div>
      <div className="p-1 flex flex-col gap-2 w-full ">
        <div className="bg-white/50 rounded-md px-4 py-2 flex justify-between items-center">
          <h1 className="md:text-xl font-bold text-indigo-500 text-md">
            Payment Declaration
          </h1>
          <div
            className="p-2 text-white/90 rounded-lg bg-green-500 flex items-center gap-2"
            onClick={() => {
              setModel(true);
            }}
          >
            <FaPlus /> <p className="md:block hidden">Pay Transfer</p>
          </div>
        </div>
        <div className="bg-white/50 p-4 rounded-lg block md:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {dataR.map((o, i) => (
              <div className="w-full bg-white p-2 rounded-lg" key={i}>
                <h1 className="text-gray-500">{i + 1}</h1>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">
                    Transfer Application:
                  </h1>
                  <p className="text-gray-800">{o.transferId?._id}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">
                    Amount Paid :
                  </h1>
                  <p className="text-gray-800 capitalize">
                    {o.amount_paid} FRW
                  </p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">
                    Payment Date :
                  </h1>
                  <p className="text-gray-800">
                    {new Date(o.payment_date).toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-indigo-500">
                    Payment Method:
                  </h1>
                  <p className="text-gray-800 capitalize">{o.payment_method}</p>
                </div>
                <div className="flex justify-center p-2">
                  <button
                    onClick={() => setCerticateModel(true)}
                    className="flex items-center gap-2 justify-center p-2 w-full rounded-xl text-md text-white bg-gray-800"
                  >
                    <FaCertificate className="text-yellow-500" />
                    <p>Generate Certificate</p>
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
                  <th>Transfer Application</th>
                  <th>Amount Paid</th>
                  <th>Payment Date</th>
                  <th>Payment Method</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {dataR.map((o, i) => (
                  <tr key={i} className="text-sm text-center capitalize">
                    <td className="px-2 p-2">{i + 1}</td>
                    <td className="px-2">{o.transferId?._id} </td>
                    <td className="px-2">{o.amount_paid}</td>
                    <td className="px-2">
                      {new Date(o.payment_date).toLocaleDateString()}
                    </td>
                    <td className="px-2">{o.payment_method}</td>
                    <td className="px-2">
                      <button
                        onClick={() => setCerticateModel(true)}
                        className="flex items-center gap-1 justify-center p-1 w-full rounded-md text-md text-white bg-green-500"
                      >
                        <FaCertificate className="text-yellow-500" />
                        <p>Certificate</p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {certicateModel && (
          <div
            className="fixed flex items-center justify-center bg-indigo-500/35 w-full inset-0"
            onClick={() => {
              setCerticateModel(false);
            }}
          >
            <div
              className="bg-white/95 w-120 p-4 rounded-2xl"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                className="flex
              flex-col gap-4 w-full"
              >
                <h1>Land Transfer Certicate</h1>
                <p>Patrick's Land is Successfull Certicatefied Transfer </p>
              </div>
            </div>
          </div>
        )}
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
                    Declare Payment
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
                  {/* transferId, amount_paid, payment_date, payment_method  */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="area_sqm"
                      className="font-semibold text-md text-blue-400"
                    >
                      Transfer Application
                    </label>
                    <select
                      onChange={handleFormData}
                      value={formData.transferId}
                      name="transferId"
                      className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                    >
                      <option value="">Select Owner</option>
                      {dataT.map((o, i) => (
                        <option key={i} value={o._id}>
                          {o._id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="location"
                      className="font-semibold text-md text-blue-400"
                    >
                      {" "}
                      Amount Paid (FRW)
                    </label>
                    <input
                      value={formData.amount_paid}
                      onChange={handleFormData}
                      type="text"
                      name="amount_paid"
                      placeholder="500"
                      className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="land_use_type"
                      className="font-semibold text-md text-blue-400"
                    >
                      {" "}
                      Payment Date
                    </label>
                    <input
                      value={formData.payment_date}
                      onChange={handleFormData}
                      type="datetime-local"
                      name="payment_date"
                      placeholder="500"
                      className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                    />
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
                      value={formData.payment_method}
                      onChange={handleFormData}
                      name="payment_method"
                      className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                    >
                      <option value="">Select Payment Method</option>
                      <option value="MTN">MTN</option>
                      <option value="AIRTEL">AIRTEL</option>
                      <option value="CASH">CASH</option>
                      <option value="BANK">BANK</option>
                      <option value="PAYPAL">PAYPAL</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 p-2 text-white/90 font-semibold rounded-md hover:rounded-2xl"
                >
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Receipt;
