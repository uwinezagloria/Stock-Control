import express from "express"
import { createUser } from "../controllers/users.controllers.js"
import { signUp } from "../middlerwares/validations"
const router=express.Router()
router.route('/users/create').post(signUp,createUser)
export default router