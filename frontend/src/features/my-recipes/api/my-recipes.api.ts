import apiClient from "@/services/apiClient";
import {
  DeleteRecipeResponse,
  GetRecipeDetailsResponse,
  GetRecipesResponse,
} from "../types/my-recipes.type";

export const myRecipeApi = {
  // Get all saved recipes
  getRecipes: async () => {
    const response = await apiClient.get<GetRecipesResponse>("/recipes");

    return response.data;
  },

  // Get one recipe with complete details
  getRecipeDetails: async (id: number) => {
    const response = await apiClient.get<GetRecipeDetailsResponse>(
      `/recipes/${id}`
    );

    return response.data;
  },

  deleteRecipe: async (id: number) => {
    const response = await apiClient.delete<DeleteRecipeResponse>(
      `/recipes/${id}`
    );

    return response.data;
  },
};