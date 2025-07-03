import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated= async(req, res, next)=>{
    // console.log(req.cookies);
    const {token} = req.cookies;
    if(!token){
       return res.status(404).json({
            success:false,
            message:"login first!"
        })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken._id);
    next();
    // res.send("idk")
}