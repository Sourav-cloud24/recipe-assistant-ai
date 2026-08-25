import { useQuery } from "@tanstack/react-query";
import { shoppingListAPI } from "../api/shopping-list.api";

export const useGetShoppingList = (date?: string) => {
  return useQuery({
    queryKey: ["shopping-list", date],
    queryFn: () => shoppingListAPI.getShoppingList(date),
  });
};
