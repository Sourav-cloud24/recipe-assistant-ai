import express from "express"
import { authenticateUser } from "../../middleware/auth.middleware.js"
// import { craeteRecipeController } from "./recipe.controller.js"
import {craeteRecipeController, deleteRecipeController, getRecipeDetailsController, getSavedRecipesController} from "./recipe.controller.js"

const recipeRoutes = express.Router()

recipeRoutes.post("/", authenticateUser , craeteRecipeController)
recipeRoutes.get("/", authenticateUser , getSavedRecipesController)
recipeRoutes.get("/:id", authenticateUser, getRecipeDetailsController);
recipeRoutes.delete("/:id", authenticateUser, deleteRecipeController);

export default recipeRoutes