import apiClient from "@/services/apiClient";
import {
  CreateMealPlan,
  CreateMealPlanResponse,
  DeleteMealPlanResponse,
  GetMealPlansResponse,
} from "../types/meal-plan.type";

export const mealPlanApi = {
  createMealPlan: async (
    data: CreateMealPlan
  ): Promise<CreateMealPlanResponse> => {
    const response = await apiClient.post<CreateMealPlanResponse>(
      "/meal-plan",
      data
    );

    return response.data;
  },

  getMealPlans: async (date?: string): Promise<GetMealPlansResponse> => {
    const response = await apiClient.get<GetMealPlansResponse>(
      "/meal-plan",
      {
        params: date ? { date } : undefined, 
      }
    );

    return response.data;
  },

  deleteMealPlan: async (id: number): Promise<DeleteMealPlanResponse> => {
    const response = await apiClient.delete(`/meal-plan/${id}`);

    return response.data;
  },
};