import apiClient from "@/services/apiClient";
import type {
  GenerateRecipeRequest,
  GeneratedRecipe,
} from "../types/recipe.type";

export const recipeApi = {
  generateRecipe: async (
    data: GenerateRecipeRequest,
  ): Promise<GeneratedRecipe> => {
    const response = await apiClient.post<GeneratedRecipe>(
      "/ai/generate",
      data,
    );

    return response.data;
  },
  
  saveRecipe: async (data: GeneratedRecipe): Promise<GeneratedRecipe> => {
    const response = await apiClient.post<GeneratedRecipe>("/recipes", data);

    return response.data;
  },
};
