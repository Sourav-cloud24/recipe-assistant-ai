import { useQuery } from "@tanstack/react-query"
import { pantryKeys } from "../keys/pantry.keys"
import { pantryApi } from "../api/pantry.api"


export const usePantryItems = (search?: string) => {
    return useQuery({
        queryKey: pantryKeys.list(search ?? ""),
        queryFn: () => pantryApi.getPantry(search)
    })
}