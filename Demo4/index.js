import { app } from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

// establish database connection before starting the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to database:', err.message);
});