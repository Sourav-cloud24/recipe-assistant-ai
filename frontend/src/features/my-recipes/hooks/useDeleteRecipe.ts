import { useMutation, useQueryClient } from "@tanstack/react-query"
import { myRecipeApi } from "../api/my-recipes.api"


export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => myRecipeApi.deleteRecipe(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["my-recipes"],
            })
        }
    })
}