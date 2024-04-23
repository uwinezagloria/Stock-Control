import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    productName:{
        type:string,
    },
    productPrice:{
        type:Number
    },
    NumberOfItems:{
        type:Number
    },
})
const productModel=mongoose.model('Products',productSchema)
export default productModel