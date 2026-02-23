import mongoose from "mongoose";


const MongoDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
export default MongoDB;