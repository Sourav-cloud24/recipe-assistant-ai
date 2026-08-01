import express from "express"
import { createPantry, getPantry } from "./pantry.controller.js"
import { authenticateUser } from "../../middleware/auth.middleware.js"

const pantryRoutes = express.Router()

pantryRoutes.post("/", authenticateUser , createPantry)
pantryRoutes.get("/", authenticateUser , getPantry)

export default pantryRoutes