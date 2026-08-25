import { useQuery } from "@tanstack/react-query";
import { mealPlanApi } from "../api/meal-plan.api";

export const useGetMealPlans = (date?: string) => {
  return useQuery({
    queryKey: ["meal-plans", date],
    queryFn: () => mealPlanApi.getMealPlans(date),
  });
};
