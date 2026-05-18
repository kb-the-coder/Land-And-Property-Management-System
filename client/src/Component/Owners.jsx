import React, { useEffect, useState } from 'react'
import { FaClosedCaptioning, FaPlus, FaTimes, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios'
import toast from 'react-hot-toast'

const Owners = () => {
  const API_URL = "http://localhost:3400/api/owner"; 
  const [data,setData] = useState([])
  const [model,setModel] = useState(false)
  const [formData, setFormData] = useState({
    nationalId:"",
    first_name:"",
    last_name:"",
    email:"",
    telephone:"",
    address:""
  });

  useEffect(()=>{
    const fecthData = async()=>{
      try {
        const res = await axios.get(`${API_URL}/display`);
        if(!res.data.success){
          return toast.error(res.data.message)
        }
        setData(res.data.Person)
        console.log(res.data)
      } catch (error) {
        alert(error.message)
      }
    }
    fecthData()
  },[formData])

  const handleFormData =async(e)=>{
    const {name,value} = e.target;
    setFormData({...formData,[name]:value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      if(!formData.nationalId || !formData.first_name || !formData.last_name || !formData.email || !formData.telephone || !formData.address){
        return toast.error("You Must Fill all Field")
      }

      const res =await axios.post(`${API_URL}/register`,formData)
      if(!res.data.success){
        return toast.error(res.data.message)
      }
      toast.success(res.data.message)
      setFormData({
        nationalId: "",
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        address: ""
      });
    } catch (error) {
      toast.error(error.message)
    }
  }
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
          {data.map((o, i) => (
            <div className="w-full bg-white p-2 rounded-lg" key={i}>
              <h1 className="text-gray-500">{i + 1}</h1>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">National Id:</h1>
                <p className="text-gray-800">{o.nationalId}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Fist Name:</h1>
                <p className="text-gray-800">{o.first_name}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Last Name:</h1>
                <p className="text-gray-800">{o.last_name}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Email:</h1>
                <p className="text-gray-800">{o.email}</p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-semibold text-indigo-500">Tel:</h1>
                <p className="text-gray-800">{o.telephone}</p>
              </div>
              <div className="flex justify-between gap-2">
                <h1 className="font-semibold text-indigo-500">Address:</h1>
                <p className="text-gray-800">{o.address}</p>
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
                <th>National Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Adress</th>
              </tr>
            </thead>
            <tbody>
              {data.map((o, i) => (
                <tr key={i} className="text-sm text-center">
                  <td className="px-2 p-2">{i + 1}</td>
                  <td className="px-2">{o.nationalId} </td>
                  <td className="px-2">
                    {o.first_name} {o.last_name}
                  </td>
                  <td className="px-2">{o.email}</td>
                  <td className="px-2">{o.telephone}</td>
                  <td className="px-2">{o.address}</td>
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
                    htmlFor="nationalId"
                    className="font-semibold text-md text-blue-400"
                  >
                    National Id{" "}
                  </label>
                  <input
                    value={formData.nationalId}
                    name="nationalId"
                    onChange={handleFormData}
                    type="number"
                    placeholder="1 19## ###### # ##"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="first_name"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    First Name{" "}
                  </label>
                  <input
                    value={formData.first_name}
                    onChange={handleFormData}
                    type="text"
                    name="first_name"
                    placeholder="YOURFIRSTNAME"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="last_name"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Last Name{" "}
                  </label>
                  <input
                    value={formData.last_name}
                    onChange={handleFormData}
                    type="text"
                    name="last_name"
                    placeholder="YourLastname"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Email{" "}
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleFormData}
                    type="email"
                    name="email"
                    placeholder="your@email.account"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="telephone"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Telephone{" "}
                  </label>
                  <input
                    value={formData.telephone}
                    type="number"
                    onChange={handleFormData}
                    name="telephone"
                    placeholder="250 78# ### ###"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="address"
                    className="font-semibold text-md text-blue-400"
                  >
                    {" "}
                    Address{" "}
                  </label>
                  <input
                    value={formData.address}
                    onChange={handleFormData}
                    type="text"
                    name="address"
                    placeholder="Kigali / Rwanda - Kicukiro"
                    className="px-3 py-1 rounded-md border border-blue-500 focus:outline-blue-300"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-500 p-2 text-white/90 font-semibold rounded-md hover:rounded-2xl"
              >
                Register Owner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Owners