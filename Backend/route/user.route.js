import express from "express";
import {register,login, authcheck} from "../controller/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";



const userRoute = express.Router();


userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.get('/authcheck',verifyUser, authcheck )

export default userRoute;