import mongoose from "mongoose";


const connectDB = async () => {
    const url = process.env.MONGODB_URL;
    if (!url) {
        console.warn('MONGODB_URL not set; skipping database connection.');
        return;
    }

    try {
        await mongoose.connect(url);
        console.log('DB connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;