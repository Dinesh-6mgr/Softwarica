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
            message: "internal server error in login controller."
        })
        console.log("internal server error in login controller", error)
    }



}
const authcheck = async (req, res) => {

    res.send("this is authcheck ")
}

const logout = async (req, res) => {

    try {
        return res.status(200).clearCookie("acessToken", {
            httpOnly: true,
            secure: true,
        })

            .json({
                message: "user logout sucessful."
            })

    }
    catch (error) {

        res.json({
            message: "internal server error in logout",
            error: error

        })
        console.log("internal server error in logout.")
    }
}

const getdata = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                message: "User context not found. Make sure verifyUser middleware is used."
            });
        }

        return res.status(200).json({
            message: "user details",
            data: user
        });
    } catch (error) {
        console.error("getdata error:", error);
        return res.status(500).json({
            message: "internal server error.",
            error: error.message,
        });
    }
}


const getAllUser =  async (req, res)=>{

  try {
      const user = await User.find().select("-password");
      if(!user){
           console.log("unable to find user.")
           return res.json({
              message: "unable to find user"
           })
      }
  
      res.status(200)
      .json({
          message:"user find sucessfully",
          totalUser: user.length,
          data: user,
      })
  } catch (error) {
    res.json({message:"error fatching all User.",
         error:error})
  }
    
}

const getUserById =     async (req, res) => {

        try {

            const getid = req.params.id
            const user = await User.findById(getid).select("-password");
            if (!user) {
                console.log("unable to find user.")
                return res.json({
                    message: "unable to find user"
                })
            }

            res.status(200)
                .json({
                    message: "user find sucessfully",
                    totalUser: user.length,
                    data: user,
                })
        } catch (error) {
            res.json({
                message: "error fatching  User by id.",
                error: error
            })
        }

      }
const getUserByemail = async( req, res)=>{

 try{
     const { email } = req.params;

     const user = await User.findOne({ email }).select("-password");
     if (!user) {
         return res.json({
             message: `user not found with ${email} email`
         })
     }

     res.json({
         message: "user found sucessfully",
         data: user
     })

 }
 catch(error){
    res.json({
        message:"internal server error in getuserBy email",
        data: error.message
    })
 }

}
export { register, login, authcheck, logout, getdata, getAllUser, getUserById, getUserByemail }