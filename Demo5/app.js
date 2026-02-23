import express from 'express';
import dotenv from 'dotenv';
import UserRouter from './route/user.route.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use("/user", UserRouter);

export default app;
    