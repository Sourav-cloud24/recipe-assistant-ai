import apiClient from "@/services/apiClient";
import { CreatePantryItemRequest, PantryResponse } from "../types/pantry.types";

export const pantryApi = {
    createPantry: async (data: CreatePantryItemRequest) => {
        const response = await apiClient.post("/pantry", data);
        return response.data;
    },
    getPantry: async (): Promise<PantryResponse> => {
        const response = await apiClient.get("/pantry");
        return response.data;
    }
}