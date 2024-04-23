import express from "express"
import { userLogin } from "../controllers/login"
const routes=express.Router()
routes.route('/user/login').post(userLogin)