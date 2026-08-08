import express from "express"
import { authenticateUser } from "../../middleware/auth.middleware.js"
import { craeteRecipeController } from "./recipe.controller.js"

const recipeRoutes = express.Router()

recipeRoutes.post("/", authenticateUser , craeteRecipeController)

export default recipeRoutes