import apiClient from "@/services/apiClient";
import {
  CreatePantryItemRequest,
  DeletePantryResponse,
  PantryItem,
  PantryResponse,
  UpdatePantryItemRequest,
} from "../types/pantry.types";

export const pantryApi = {
  createPantry: async (data: CreatePantryItemRequest) => {
    const response = await apiClient.post("/pantry", data);
    return response.data;
  },
  getPantry: async (search?: string): Promise<PantryResponse> => {
    const response = await apiClient.get("/pantry", {
      params: {
        search,
      },
    });
    return response.data;
  },
  getPantryItemById: async (id: number): Promise<PantryItem> => {
    const response = await apiClient.get(`/pantry/${id}`);
    return response.data;
  },
  updatePantryItem: async ({
    id,
    data,
  }: {
    id: number;
    data: UpdatePantryItemRequest;
  }): Promise<PantryItem> => {
    const response = await apiClient.put(`/pantry/${id}`, data);
    return response.data;
  },
  deletePantryItem: async (id: number): Promise<DeletePantryResponse> => {
    const response = await apiClient.delete(`/pantry/${id}`);
    return response.data;
  },
};
