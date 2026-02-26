


import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.acessToken;
        console.log("token:", req?.cookies)

        if (!token) {
            res.status(404).json({
                message: "unauthorize please login"
            })
        }

        const decode = jwt.verify(token, process.env.ACESS_KEY);

        const user = await User.findById(decode?.userId).select("-password");
        if (!user) {
            return res.json("user not found");
        }
        req.user = user;
        next()

    }
    catch (error) {
        console.log("internal server error in verifyUser middleware", error)
    }

}