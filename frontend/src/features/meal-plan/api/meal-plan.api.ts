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

  getMealPlans: async (): Promise<GetMealPlansResponse> => {
    const response = await apiClient.get<GetMealPlansResponse>(
      "/meal-plan"
    );

    return response.data;
  },
};