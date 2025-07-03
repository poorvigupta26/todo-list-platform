import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getAllUsers = async(req, res, next)=>{
   try {
    const AllUsers = await User.find({});
    res.json({
        success:true,
        AllUsers
    })
   } catch (error) {
    next(error);
   }
}
export const login = async(req, res, next)=>{
    try {
    const{email, password}= req.body;
    let user = await User.findOne({email}).select("+password");
    // console.log(user);
    if(user){
        const verifyPass = await bcrypt.compare(password, user.password);
        if(verifyPass){
            setCookie(user, res, `Welcome ${user.name}`, 200);
        }
        else{
            res.status(404).json({
                success:false,
                message:"incorrect password or email"
            })
        }
    }
    else{
        //redirect to register
        return next(new ErrorHandler("User does not exist.", 400));
    }
    } catch (error) {
        next(error);
    }
}

export const register = async(req, res, next)=>{
    try {
        const{name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user)return next(new ErrorHandler("Login First!", 400));
        //login redirect
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({name, email, password:hashedPassword})
        setCookie(user, res, "user registered successfully!", 201);
    } catch (error) {
        next(error);
    }
};

export const getMyProfile =(req, res)=>{
    // assuming that we are logged in and we have a token that we can use to access our id
        return res.status(200).json({
            success:true,
            user: req.user
        })
}

export const logout=(req, res)=>{
    res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
        success:true,
        message:"logged out"
    })
}