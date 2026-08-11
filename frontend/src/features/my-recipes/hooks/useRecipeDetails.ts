import { useQuery } from "@tanstack/react-query";
import { myRecipeApi } from "../api/my-recipes.api";

export const useRecipeDetails = (id: number) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => myRecipeApi.getRecipeDetails(id),
    enabled: !!id,
  });
};