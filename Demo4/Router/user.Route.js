import { Router } from "express";
import { login } from "../controller/user.controller.js";

const userRoute = Router();

userRoute.post('/login', login);

export default userRoute;