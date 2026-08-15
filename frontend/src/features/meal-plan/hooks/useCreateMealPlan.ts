import { pantryApi } from "@/features/pantry/api/pantry.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mealPlanApi } from "../api/meal-plan.api";
import { CreateMealPlan } from "../types/meal-plan.type";

export const useCreateMealPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMealPlan) => mealPlanApi.createMealPlan(data),

    onSuccess: () => {
      // Refresh meal plans after adding a new meal
      queryClient.invalidateQueries({
        queryKey: ["meal-plans"],
      });
    },
  });
};
