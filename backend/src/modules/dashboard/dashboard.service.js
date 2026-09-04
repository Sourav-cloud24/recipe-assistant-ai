import {
  getPantryOverview,
  getRecentRecipes,
  getShoppingListOverview,
  getUpcomingMeals,
} from "./dashboard.repository.js";

// Get Monday of the current week
const getCurrentWeekStart = () => {
  const today = new Date();

  const day = today.getDay();

  const diff = day === 0 ? -6 : 1 - day;

  today.setDate(today.getDate() + diff);

  return today.toISOString().split("T")[0];
};

// Get Sunday of the selected week
const getWeekEnd = (weekStart) => {
  const date = new Date(`${weekStart}T00:00:00`);

  date.setDate(date.getDate() + 6);

  return date.toISOString().split("T")[0];
};

export const getDashboardData = async (user_id, week_start_date) => {
  const selectedWeekStart = week_start_date ? week_start_date : getCurrentWeekStart();

  // console.log("Service called -->", selectedWeekStart);

  const [
    pantryOverview,
    upcomingMeals,
    shoppingListOverview,
    recentRecipes,
  ] = await Promise.all([
    getPantryOverview(user_id),
    getUpcomingMeals(user_id, selectedWeekStart),
    getShoppingListOverview(user_id, selectedWeekStart),
    getRecentRecipes(user_id),
  ]);

  return {
    week: {
      start_date: selectedWeekStart,
      end_date: getWeekEnd(selectedWeekStart),
    },

    pantry: {
      total_items: Number(pantryOverview.total_items),
      low_stock_items: Number(pantryOverview.low_stock_items),
      expiring_soon_items: Number(
        pantryOverview.expiring_soon_items
      ),
    },

    upcoming_meals: upcomingMeals,

    shopping_list: {
      total_items: Number(shoppingListOverview.total_items),
      pending_items: Number(
        shoppingListOverview.pending_items
      ),
      purchased_items: Number(
        shoppingListOverview.purchased_items
      ),
    },

    recent_recipes: recentRecipes,
  };
};