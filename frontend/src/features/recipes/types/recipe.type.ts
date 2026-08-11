export interface RecipeIngredient {
  name: string;
  quantity: number | string;
  unit: string;
}

export interface RecipeNutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  cuisine: string;
  diet: string;
  cooking_time: number;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  nutrition: RecipeNutrition;
}

export interface GenerateRecipeRequest {
  ingredients: string[];
  cuisine?: string;
  diet?: string;
  servings?: number;
}