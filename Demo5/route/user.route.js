import express from "express";
import { login, register } from "../controller/user.controller.js";



const UserRouter = express.Router();
UserRouter.post("/register", register);
UserRouter.post("/login",login )

export default UserRouter;