export type DashboardResponse = {
  success: boolean;
  message: string;
  data: DashboardData;
};

export type DashboardData = {
  week: {
    start_date: string;
    end_date: string;
  };

  pantry: {
    total_items: number;
    low_stock_items: number;
    expiring_soon_items: number;
  };

  upcoming_meals: UpcomingMeal[];

  shopping_list: {
    total_items: number;
    pending_items: number;
    purchased_items: number;
  };

  recent_recipes: RecentRecipe[];
};

export type UpcomingMeal = {
  id: string;
  meal_date: string;
  meal_type: string;
  notes: string | null;
  recipe_id: string;
  recipe_title: string;
};

export type RecentRecipe = {
  id: string;
  title: string;
  description: string;
  cuisine: string | null;
  diet: string | null;
  cooking_time: number;
  servings: number;
  source: string;
  created_at: string;
};