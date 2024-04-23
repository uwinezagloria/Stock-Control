import mongoose from "mongoose"
const signUpSchema=new mongoose.Schema({
   FullName:{
        type:String
    },
    Email:{
type:String,
unique:true
    },
    Password:{
        type:String
    },
    Role:['Stock-Keeper','Manager']
},{timestamps:true})
const userModel=mongoose.model('users',signUpSchema)
export default userModel