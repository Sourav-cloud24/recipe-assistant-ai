import express from "express"
import { createPantry, getPantry, getPantryItemById, updatePantryItem, deletePantryItem } from "./pantry.controller.js"
import { authenticateUser } from "../../middleware/auth.middleware.js"

const pantryRoutes = express.Router()

pantryRoutes.post("/", authenticateUser , createPantry)
pantryRoutes.get("/", authenticateUser , getPantry)
pantryRoutes.get("/:id", authenticateUser, getPantryItemById);
pantryRoutes.put("/:id", authenticateUser, updatePantryItem);
pantryRoutes.delete("/:id", authenticateUser, deletePantryItem);

export default pantryRoutes