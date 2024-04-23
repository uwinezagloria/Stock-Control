import customError from "../middlerwares/customError.js";
import asyncWrapper from "../middlerwares/async.js";
import { validationResult } from "express-validator";
import userModel from "../models/signUp.model.js";
import bcrypt, { compare } from "bcrypt"
//finding all users
export const userLogin=asyncWrapper(async(req,res,next)=>{
    const email=req.body.email
    const password=req.body.password
    const getusers=await userModel.findOne({email:email})
    if(!getusers){
        return next(new customError("user no long exist ask admin to add you",404))
    }
    const comparePassword=await bcrypt.compare(password,getusers.Password)
    if(!comparePassword){
        return next(new customError("wrong password",403))
    }
    res.status(200).json({message:"login successfully"})
})