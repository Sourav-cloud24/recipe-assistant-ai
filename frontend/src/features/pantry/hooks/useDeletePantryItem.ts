import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pantryApi } from "../api/pantry.api";
import { pantryKeys } from "../keys/pantry.keys";

export const useDeletePantryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pantryApi.deletePantryItem,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pantryKeys.all});
    }
  })
};
