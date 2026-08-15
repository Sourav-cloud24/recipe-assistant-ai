export type MealType =
  | "BREAKFAST"
  | "LUNCH"
  | "DINNER"
  | "SNACK";

export interface CreateMealPlan {
  meal_date: string;
  meal_type: MealType;
  recipe_id: number;
  // servings: number;
  notes?: string;
}

export interface MealPlan {
  id: number;
  user_id: number;
  recipe_id: number;
  meal_date: string;
  meal_type: MealType;
  servings: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateMealPlanResponse {
  success: boolean;
  message: string;
  data: MealPlan;
}

export interface GetMealPlansResponse {
  success: boolean;
  message: string;
  data: {
    start_date: string;
    end_date: string;
    meal_plans: MealPlan[];
  };
}