import { Router } from "express";
import { register } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.route('/register').post(register)


export {userRoute}