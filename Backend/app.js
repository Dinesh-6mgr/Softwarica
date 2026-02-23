import express from "express"
import userRoute from "./route/user.route.js";


const app = express();

app.use(express.json())
app.use('/user', userRoute)
export default app;