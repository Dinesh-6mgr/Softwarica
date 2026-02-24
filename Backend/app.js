import express from "express"
import userRoute from "./route/user.route.js";
import itemRoute from "./route/items.route.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json())


app.use(cookieParser())
app.use('/user', userRoute)
app.use('/item',itemRoute)
export default app;