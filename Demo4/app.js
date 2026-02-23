import express from "express";
import dotenv from "dotenv";
import userRoute from "./Router/user.Route.js";

const app = express();

dotenv.config();

// built‑in middleware to parse JSON bodies
app.use(express.json());

app.use('/user', userRoute);

export { app };