import bcrypt from "bcrypt"
import users from "../models/users.js";


const register = async (req, res) => {

    try {

        const { email, password } = req.body;


        const newPassword = await bcrypt.hash(password, 10)
        console.log(password)
        console.log(newPassword)

        const user = await users.create(
            {
                email,
                password: newPassword
            }
        )
        res.json({
            message: " user create sucessfully."
        })
    }

    catch (error) {
        console.log(error)
        return res.json({
            message: "unable to create user."
        })
    }
}

const login = async (req, res) => {


    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                message: "all field are required"

            })
        }
        const user = await users.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "user not found"
            })

        }


        const ispassword = await bcrypt.compare(password, user.password);
        if(!ispassword){
            res.json({
                message:"password invalid"
            })
        }
        else{
            res.json({
                message:" login sucessfully"
            })
        }
    }
    catch (error) {
    console.log(error)
    return res.json({
        message: "unable to find user."
    })
}
}






export {
    register,
    login

}