import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const GENERATE_ACESSTOKEN = (user) => {
    return jwt.sign({
        userId: user._id,
        username: user.username,
        email: user.email,
        password: user.password
    }, process.env.ACESS_KEY, { expiresIn: "1h" })
}

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User created successfully",
            data: newUser.username, email,
        });
    } catch (error) {
        console.error("Register error:", error); // add this line

        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "all field are require" })

        }

        const existuser = await User.findOne({ email });

        if (!existuser) {
            return res.json({
                message: "user not found"
            })
        }

        const passwordCheck = await bcrypt.compare(password, existuser.password)

        if (!passwordCheck) {
            return res.json({ message: "incorrect password" })
        }

        const accessToken = GENERATE_ACESSTOKEN(existuser)

        res.cookie("acessToken", accessToken, {
            httpOnly: true,
            secure: true,
        }).json({
            message: "login sucessfully",
            accessToken
        })
    }
    catch (error) {
        res.json({
            message: "internal server error."
        })
        console.log("internal server error")
    }



}
const authcheck = async (req, res) => {

    res.send("this is authcheck ")
}
export { register, login, authcheck }