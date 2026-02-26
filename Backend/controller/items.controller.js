import items from "../models/items.models.js";


const addItems = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.json({
                message: "all field are required."
            })
        }

            const newitem = await items.create({
                name,
                price,
                description
            })
            return res.json({
                message: "Item add sucessfully",
                data: newitem
            })

    }
    catch (error) {
        console.error("Add item error:", error);
        return res.status(500).json({
            message: "Internal server error in add itmes",
            error: error.message,           
        });
    }
}

const displayItem = async (req, res) => {
    try {
        const {name} = req.body;

        if(name){
            const item = await items.findOne({name});
            return res.json({
                message: "Item display sucessfully",
                data: item
            })
        }
      
    }
    catch (error) {
        console.error("Display item error:", error);
        return res.status(500).json({
            message: "Internal server error in display itmes",
            error: error.message,           
        });
    }
}
export {
    addItems,
    displayItem
};