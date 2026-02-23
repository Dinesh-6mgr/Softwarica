import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import userRoute from "./Route/user.route.js";

const app = express();

dotenv.config();


app.use(
    cors({
        origin: process.env.cors_origin,

        credentials: true,
    })
);

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended: true, limit:"10mb"}));
app.use(express.static("public"))
app.use(cookieParser())


app.use('/api/user', userRoute)
export {app}