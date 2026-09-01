import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shoppingListAPI } from "../api/shopping-list.api";

type UpdateShoppingListStatusPayload = {
  id: number;
  status: "PENDING" | "PURCHASED";
};

export const useUpdateShoppingListItemStatus = (date?: string) => {
  // queryKey: ["shopping-list", date],
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateShoppingListStatusPayload) => shoppingListAPI.changeShoppingItemStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shopping-list"]
      })
    }
  })
};