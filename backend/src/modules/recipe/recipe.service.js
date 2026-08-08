import { createRecipe } from "./recipe.repository.js"


export const saveRecipe = async (recipeData) => {
    const recipe = await craeteRecipeController(recipeData)

    return recipe
}