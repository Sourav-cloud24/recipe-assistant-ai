import apiClient from "@/services/apiClient";
import { GetShoppingListResponse } from "../types/shopping-list.types";

export const shoppingListAPI = {
  getShoppingList: async (date?: string): Promise<GetShoppingListResponse> => {
    const response = await apiClient.get<GetShoppingListResponse>(
      "/shopping-list",
      {
        params: date ? { date } : undefined,
      },
    );

    return response.data;
  },

  changeShoppingItemStatus: async ({
    id,
    status,
  }: {
    id: number;
    status: "PENDING" | "PURCHASED";
  }) => {
    const response = await apiClient.patch(`/shopping-list/${id}/status`, {
      status,
    });

    return response.data;
  },
};
