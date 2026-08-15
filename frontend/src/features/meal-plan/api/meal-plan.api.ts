import apiClient from "@/services/apiClient";
import {
  CreateMealPlan,
  CreateMealPlanResponse,
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
};