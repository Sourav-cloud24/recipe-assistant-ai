import { useMutation, useQueryClient } from "@tanstack/react-query"
import { pantryApi } from "../api/pantry.api"
import { pantryKeys } from "../keys/pantry.keys"


export const useCreatePantry = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: pantryApi.createPantry,
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pantryKeys.all })
        }
    })
}