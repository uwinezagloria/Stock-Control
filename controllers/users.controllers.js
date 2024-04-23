
import customError from "../middlerwares/customError.js";
import asyncWrapper from "../middlerwares/async.js";
import { validationResult } from "express-validator";
import userModel from "../models/signUp.model.js";
import bcrypt from "bcrypt"
//creating user
export const createUser=asyncWrapper(async(req,res,next)=>{
const admin=req.query.role
if(admin !== "Owner"){
    return next(new customError("Only admin can create a user", 403))
}
//validations
const error=validationResult(req)
if(!error.isEmpty()){
    return next(new customError(error.array()[0].msg,400))
}
//hashing  password
const hashedPassword=await bcrypt.hash(req.body.password,10)
//creating user
const newUser=new userModel({
    FullName:req.body.FullName,
    Email:req.body.Email,
    password:hashedPassword,
    Role:req.body.Role
})
const saveUser=await newUser.save()
console.log(saveUser)
res.status(201).json({message:"user created successfully"})
});
//UPDATING USER
export const updateUser=asyncWrapper(async(req,res,next)=>{
    const admin=req.query.role
    if(admin!=="Owner"){
        return next(new customError("only admin can update user",400))
    }
    const update=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!update){
        return next(new  customError("Not found",404))
    }
    if(req.body.Password){
        req.body.Password=await bcrypt.hash(req.body.Password,10)
    }
    res.status(201).json({message:"user updated"})
})
//deleting users
export const removeUser=asyncWrapper(async(req,res,next)=>{
    const admin=req.query.role
    if(admin!=="Owner"){
        return next(new customError("only admin can update user",400))
    }
    const deleteUser=await userModel.findByIdAndDelete(req.params.id)
    if(!deleteUser){
        return next(new customError("not found",404))
    }
    res.status(200).json({msg:"user removed successfully"})
})