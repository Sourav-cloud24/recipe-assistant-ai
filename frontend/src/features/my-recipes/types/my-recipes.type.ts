export interface RecipeSummary {
  id: number;
  title: string;
  description: string;
  cuisine: string;
  diet: string;
  cooking_time: number;
  servings: number;
  created_at: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
}

export interface RecipeInstruction {
  id: number;
  step_number: number;
  instruction: string;
}

export interface RecipeNutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface RecipeDetails extends RecipeSummary {
  user_id: number;
  updated_at: string;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  nutrition: RecipeNutrition | null;
}

export interface GetRecipesResponse {
  success: boolean;
  message: string;
  data: RecipeSummary[];
}

export interface GetRecipeDetailsResponse {
  success: boolean;
  message: string;
  data: RecipeDetails;
}