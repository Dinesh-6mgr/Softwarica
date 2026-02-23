import app from './app.js';
import MongoDB from './config/db.js';
const PORT = process.env.PORT;

MongoDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})