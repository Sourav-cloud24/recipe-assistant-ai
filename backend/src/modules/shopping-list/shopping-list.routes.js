import express from "express"

import { authenticateUser } from "../../middleware/auth.middleware.js"
import { getShoppingListController, updateShoppingListStatusController } from "./shopping-list.controller.js"

const shoppingListRoutes = express.Router()

shoppingListRoutes.get("/",authenticateUser, getShoppingListController)
shoppingListRoutes.patch("/:id/status", authenticateUser, updateShoppingListStatusController)

export default shoppingListRoutes