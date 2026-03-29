import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const isAuthenticated = async (req,res,next)=>{
    try{
        const token= req.cookies.token;
        if(!token){
            return res.status(401).json({message:"User not authenticated"})
        };
        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
       if(!decode){
        return res.status(401).json({message:"Invalid token"});
       };
       req.id = decode.userId;
        next();
    }catch(error){
        console.log(error);
    }
};
export const getOtherUsers = async (req,res)=>{
    try{
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    }catch(error){
        console.log(error);
    }
}
export default isAuthenticated;