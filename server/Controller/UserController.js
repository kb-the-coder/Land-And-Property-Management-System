import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


export const Register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const emailExist = await User.findOne({email})
        if(emailExist){
            return res.json({success:false,message:"Email Already Exist"})
        }
        const hashPass = await bcrypt.hash(password,10)
        const person = await User.create({
            name,
            email,
            password:hashPass
        })

        const token = jwt.sign({id:person._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        return res.json({success:true,message:"Account Created Successfull",token,person})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const emailExist = await User.findOne({ email });
        if (!email) {
          return res.json({ success: false, message: "Email Not  Exist" });
        }
        const isMatch = await bcrypt.compare(password,emailExist.password)

        if (!isMatch) {
          return res.json({ success: false, message: "invalid Password" });
        }

        const token = jwt.sign({ id: emailExist._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.json({success:true,message:"Login Successfull",token,user:emailExist})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const verify = async(req,res)=>{
    try {
        const user = req.user
        return res.json({success:true,user})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}