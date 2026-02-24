import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

const items = mongoose.model("Items", itemsSchema);

export default items;