import express from "express"
import { addItems, displayItem } from "../controller/items.controller.js";

const itemRoute = express.Router()

itemRoute.post('/addItem', addItems)
itemRoute.get('/displayItem', displayItem)
export default itemRoute;
