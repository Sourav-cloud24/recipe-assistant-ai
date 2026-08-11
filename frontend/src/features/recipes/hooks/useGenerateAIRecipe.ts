import { pantryApi } from "@/features/pantry/api/pantry.api"; 
import { useMutation, useQuery } from "@tanstack/react-query";
import { recipeApi } from "../api/recipe.api";
import { GeneratedRecipe, GenerateRecipeRequest } from "../types/recipe.type";

export const useGenerateAIRecipe = () => {
    return useMutation({
        mutationFn: (data: GenerateRecipeRequest) => 
            recipeApi.generateRecipe(data)
    })
}
