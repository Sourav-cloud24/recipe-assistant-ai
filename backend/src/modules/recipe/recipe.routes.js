import express from "express"
import { authenticateUser } from "../../middleware/auth.middleware.js"
// import { craeteRecipeController } from "./recipe.controller.js"
import {craeteRecipeController, getRecipeDetailsController, getSavedRecipesController} from "./recipe.controller.js"

const recipeRoutes = express.Router()

recipeRoutes.post("/", authenticateUser , craeteRecipeController)
recipeRoutes.get("/", authenticateUser , getSavedRecipesController)
recipeRoutes.get("/:id", authenticateUser, getRecipeDetailsController);

export default recipeRoutes