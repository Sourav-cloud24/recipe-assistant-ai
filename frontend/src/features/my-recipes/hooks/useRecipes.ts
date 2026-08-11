import { useQuery } from "@tanstack/react-query";
import { myRecipeApi } from "../api/my-recipes.api";

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: myRecipeApi.getRecipes,
  });
};