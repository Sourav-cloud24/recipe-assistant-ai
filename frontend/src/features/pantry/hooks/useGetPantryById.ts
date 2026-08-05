import { useQuery } from "@tanstack/react-query"
import { pantryKeys } from "../keys/pantry.keys"
import { pantryApi } from "../api/pantry.api"

export const useGetPantryById = (id: number | null, enabled: boolean) => {
    return useQuery({
        queryKey: pantryKeys.detail(id),
        queryFn: () => pantryApi.getPantryItemById(id as number),
        enabled: enabled && id !== null, 
    })
}