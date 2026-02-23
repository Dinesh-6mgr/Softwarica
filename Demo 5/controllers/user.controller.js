import { User } from "../models/user.schema.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({
      message: "Unable to register user",
    });
  }
};

export { register };