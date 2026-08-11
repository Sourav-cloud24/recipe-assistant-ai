import { useMutation } from "@tanstack/react-query";
import { recipeApi } from "../api/recipe.api";
import { GeneratedRecipe, GenerateRecipeRequest } from "../types/recipe.type";

export const useSaveAIRecipe = () => {
    return useMutation({
        mutationFn: (data: GeneratedRecipe) => 
            recipeApi.saveRecipe(data)
    })
}
