console.log("my stock")
import express from "express";
import mongoose from "mongoose"
import errorHandler from "./middlerwares/errorHandler.js";
import router from "./routes/signUp.routes.js";
import dotenv from "dotenv"
dotenv.config()
const app=express()
app.use(express.json())
app.use(router)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("database connected")
    app.listen(process.env.PORT,()=>{
        console.log(`server listening on port ${process.env.PORT}`)
    })
})
app.use(errorHandler)
