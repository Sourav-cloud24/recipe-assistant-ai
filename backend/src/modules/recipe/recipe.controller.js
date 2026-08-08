import { errorResponse, successResponse } from "../../utils/response.js"
import { saveRecipe } from "./recipe.service.js"


export const craeteRecipeController = async (req, res) => {
    try {
        const userId = req.user.id
        const recipeData = {
            ...req.body,
            user_id: userId
        }

        const recipe = await saveRecipe(recipeData)

        return successResponse(res, {
            statusCode: 201,
            message: "Recipe saved successfully",
            data: deletedPantryItem,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: error.message
        });
    }
}