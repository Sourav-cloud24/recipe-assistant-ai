import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pantryApi } from "../api/pantry.api";
import { pantryKeys } from "../keys/pantry.keys";

export function useUpdatePantryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pantryApi.updatePantryItem,

    onSuccess: (_, variables) => {
      // Refresh the pantry list
      queryClient.invalidateQueries({
        queryKey: pantryKeys.all,
      });

      // Refresh this pantry item's details
      queryClient.invalidateQueries({
        queryKey: pantryKeys.detail(variables.id),
      });
    },
  });
}