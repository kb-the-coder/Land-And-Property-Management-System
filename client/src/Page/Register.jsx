import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const API_URL = "http://localhost:3400/api/user";
    const nav = useNavigate()
        const [data,setData] = useState({
            name:"",
            email:"",
            password:""
        })
    
        const handleData = async(e)=>{
            const {name,value} = e.target;
            setData({...data,[name]:value})
        }
    
        const handleSubmit = async(e)=>{
            e.preventDefault();
            try {
                if(!data.email || !data.password){
                    return toast.error("Fill All Field")
                }
                const res = await axios.post(`${API_URL}/register`,data)
                if(!res.data.success){
                    return toast.error(res.data.message)
                }
                toast.success(res.data.message)
                return nav("/login")
            } catch (error) {
                toast.error(error.message)
            }
        }
  return (
    <div>
      <div className="flex items-center justify-center bg-linear-to-br from-indigo-500 via-blue-200 to-indigo-400 w-full min-h-screen">
        <div className="w-100 h-100 rounded-xl p-4 flex items-center justify-center bg-white/50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="p-2">
              <h1 className="text-center text-xl text-indigo-500 font-bold">
                Welcome, Register
              </h1>
              <p className="text-center text-sm text-indigo-500/50 font-semibold">
                Register Here To Manage Land And Property Registration
              </p>
            </div>
            <input
              type="text"
              name="name"
              onChange={handleData}
              className="p-1.5 border border-indigo-500 focus:outline-blue-500 rounded-md"
              placeholder="Your FullName"
            />
            <input
              type="email"
              name="email"
              onChange={handleData}
              className="p-1.5 border border-indigo-500 focus:outline-blue-500 rounded-md"
              placeholder="your@email.account"
            />
            <input
              type="password"
              name="password"
              onChange={handleData}
              className="p-1.5 border border-indigo-500 focus:outline-blue-500 rounded-md"
              placeholder="********"
            />
            <button
              type="submit"
              className="p-1.5 hover:bg-indigo-400 hover:rounded-xl rounded-md text-white bg-indigo-500 font-semibold"
            >
              Register Now
            </button>
            <p className="text-sm text-gray-500">
              Already Have Account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-500 hover:underline"
              >
                Login Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register