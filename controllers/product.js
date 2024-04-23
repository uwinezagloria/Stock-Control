import productModel from "../models/products.js";
import asyncWrapper from "../middlerwares/async.js";
import { validationResult } from "express-validator";
import customError from "../middlerwares/customError.js";
//adding new product
export const createProduct=asyncWrapper(async(req,res,next)=>{
    //validating
    const error=validationResult(req)
    if(!error.isEmpty()){
        return next(new customError(error.array()[0].msg,400))
    }
//creating product
const newProduct=await productModel.create(req.body)
res.status(201).json({product:newProduct})
})
//updating products
export const updateProduct=asyncWrapper(async(req,res,next)=>{
    const update=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!update){
        return  next(new customError("Not found",404))
    }
    res.status(200).json({updatedProduct:update})
})
//get product by name
export const getByName=asyncWrapper(async(req,res,next)=>{
    const getProduct=await productModel.findOne({name:req.query.name})
    if(!getProduct){
        return next(new customError("not found",404))
    }
    res.status(200).json({product:getProduct})
})
//get all products
export const getAllProduct=asyncWrapper(async(req,res,next)=>{
    const getAll=await productModel.find()
    res.status(404).json({products:getAll})
})
// removing product
export const deleteProduct=asyncWrapper(async(req,res,next)=>{
    const removedProduct=await productModel.findByIdAndDelete(req.params.id)
    if(!removedProduct){
        return next(new customError("not found",404))
    }
    res.status(200).json("product removed")
})