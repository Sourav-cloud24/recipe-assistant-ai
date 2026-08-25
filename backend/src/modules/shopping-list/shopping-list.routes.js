import express from "express"

import { authenticateUser } from "../../middleware/auth.middleware.js"
import { getShoppingListController } from "./shopping-list.controller.js"

const shoppingListRoutes = express.Router()

shoppingListRoutes.get("/",authenticateUser, getShoppingListController)

export default shoppingListRoutes