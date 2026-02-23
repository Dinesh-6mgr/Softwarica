import { Router } from "express";
import { register,login } from "../controllers/user.controler.js";

const userRoute= Router();


userRoute.route('/register').post(register)
userRoute.route('/login').post(login)


export default userRoute;