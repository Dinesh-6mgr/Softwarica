import express from "express";
import {register,login, authcheck, logout, getdata, getAllUser, getUserById, getUserByemail} from "../controller/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";



const userRoute = express.Router();


userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.post('/logout', logout);
userRoute.get('/getdata',verifyUser, getdata)
userRoute.get('/getalluser', verifyUser, getAllUser)
userRoute.get('/getuser/:id', verifyUser, getUserById)
userRoute.get('/getuserbyemail/:email',verifyUser, getUserByemail)
userRoute.get('/authcheck',verifyUser, authcheck )
export default userRoute;