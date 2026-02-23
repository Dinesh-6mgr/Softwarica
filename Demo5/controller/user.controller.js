import { user } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateKey } from "crypto";
import jwt from "jsonwebtoken";

const genrateAcessToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            name: user.username,
            password: user.password,

        },
        process.env.ACESS_KEY,
        { expiresIn: "2d" }
    )
}
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required",
            });
        }

        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await user.create({
            username,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User registered successfully",
            data: newuser.username,
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }

}

const login = async (req, res) => {
    const { username, password } = req.body;

    const loginuser = await user.findOne({ username });
    const ispassword = await bcrypt.compare(password, loginuser.password);

    if (!ispassword) {
        res.json({
            message: "invalid password"
        })
    }

    const AcessToken = await genrateAcessToken(user);

    return res
        .status(201)
        .cookie("acesstoken", AcessToken, {
            httponly: true,
            secure: true,

        })
        .json({
            message: "login sucessfully."
        })
}

export {
    login, register
}