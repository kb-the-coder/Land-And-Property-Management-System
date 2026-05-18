import jwt from 'jsonwebtoken'
import User from '../Models/UserModel.js';

export const verifyUser = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.json({success:false,message:"Token Not Provided"})
        }

        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token,secret)
        if(!decoded){
            return res.json({success:false,message:"Token Not Valid"})
        }

        const user = await User.findById({_id:decoded.id}).select("-password")

        if(!user){
            return res.json({success:false,message:"User Not Found"})
        }

        req.user = user
        next();
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}