import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mealPlanApi } from "../api/meal-plan.api";

export const useDeleteMealPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => mealPlanApi.deleteMealPlan(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meal-plans"],
      });
    },
  });
};

