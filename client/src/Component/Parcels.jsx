import React, { useEffect, useState } from 'react'
import { FaClosedCaptioning, FaPlus, FaTimes, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios'
import toast from 'react-hot-toast'


const Parcels = () => {
  // area_sqm, location, parcel_status, land_use_type, land_owner_id
  const API_URL = "http://localhost:3400/api/owner";
  const API_URL_L = "http://localhost:3400/api/land";
  const [data, setData] = useState([]);
  const [landData,setLandData] = useState([])
  const [model, setModel] = useState(false);
  const [formData, setFormData] = useState({
    area_sqm:"",
    location:"",
    parcel_status:"",
    land_use_type:"",
    land_owner_id:""
  });

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
      fecthData();
    }, [formData]);
 
  const handleFormData = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      if (
        !formData.area_sqm ||
        !formData.location ||
        !formData.land_use_type ||
        !formData.parcel_status ||
        !formData.land_owner_id 
      ) {
        return toast.error("You Must Fill all Field");
      }

      const res = await axios.post(`${API_URL_L}/register`, formData);
      if (!res.data.success) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message);
      setFormData({
        nationalId: "",
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        address: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-1 flex flex-col gap-2 w-full ">
      <div className="bg-white/50 rounded-md px-4 py-2 flex justify-between items-center">
        <h1 className="md:text-xl font-bold text-indigo-500 text-md">
          Register Land Owner
        </h1>
        <div
          className="p-2 text-white/90 rounded-lg bg-green-500 flex items-center gap-2"
          onClick={() => {
            setModel(true);
          }}
        >
          <FaPlus /> <p className="md:block hidden">Add New Owner</p>
        </div>
      </div>
      <div className="bg-white/50 p-4 rounded-lg block md:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {landData.map((o, i) => (
            <div className="w-full bg-white p-2 rounded-lg" key={i}>
              <h1 className="text-gray-500">{i + 1}</h1>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Area / Square:</h1>
                <p className="text-gray-800">{o.area_sqm}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Location:</h1>
                <p className="text-gray-800 capitalize">{o.location}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Use Type</h1>
                <p className="text-gray-800">{o.land_use_type}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Status</h1>
                <p className="text-gray-800 capitalize">{o.parcel_status}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Owner</h1>
                <p className="text-gray-800">{o.land_owner_id.first_name}</p>
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
                <th>Area / Sqaure</th>
                <th>Location</th>
                <th>Use Type</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {landData.map((o, i) => (
                <tr key={i} className="text-sm text-center capitalize">
                  <td className="px-2 p-2">{i + 1}</td>
                  <td className="px-2">{o.area_sqm} </td>
                  <td className="px-2">{o.location}</td>
                  <td className="px-2">{o.land_use_type}</td>
                  <td className="px-2">{o.parcel_status}</td>
                  <td className="px-2">{o.land_owner_id.first_name}</td>
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
                  Add Owner
                </h1>
                {/* area_sqm, location, parcel_status, land_use_type, land_owner_id */}
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
                    htmlFor="area_sqm"
                    className="font-semibold text-md text-blue-400"
                  >
                    Area Per Sqaure
                  </label>
                  <input
                    value={formData.area_sqm}
                    name="area_sqm"
                    onChange={handleFormData}
                    type="number"
                    placeholder="100"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="location"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Location
                  </label>
                  <input
                    value={formData.location}
                    onChange={handleFormData}
                    type="text"
                    name="location"
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
                    Land Use Type
                  </label>
                  <select
                    onChange={handleFormData}
                    name="land_use_type"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  >
                    <option value="">Select Land Use Type</option>
                    <option value="Bulding">Bulding</option>
                    <option value="Agriculture & Farming">
                      Agriculture & Farming
                    </option>
                    <option value="Industries">Industries</option>
                    <option value="Ecommerce">Ecommerce</option>
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
                    onChange={handleFormData}
                    name="parcel_status"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  >
                    <option value="">Select Land Status</option>
                    <option value="available">Available</option>
                    <option value="for sale">
                      For Sale
                    </option>
                    <option value="not for sale">Not For Sale</option>
                   </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="land_owner_id"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Land Owner
                  </label>
                  <select
                    onChange={handleFormData}
                    name="land_owner_id"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  >
                    <option value="">Select Owner</option>
                    {data.map((o, i) => (
                      <option key={i} value={o._id}>
                        {o.first_name} {o.last_name}
                      </option>
                    ))}
                  </select>
                </div>
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
}

export default Parcels