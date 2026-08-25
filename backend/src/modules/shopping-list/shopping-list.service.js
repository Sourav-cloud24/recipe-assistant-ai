import {
  getMealPlansForShoppingList,
  getRecipeIngredientsForShoppingList,
  getPantryItemsForShoppingList,
} from "./shopping-list.repository.js";

export const getShoppingList = async (user_id, start_date, end_date) => {
  // 1. Get meal plans for the selected week
  const mealPlans = await getMealPlansForShoppingList(
    user_id,
    start_date,
    end_date,
  );

  // If no meal plans exist
  if (mealPlans.length === 0) {
    return [];
  }

  // 2. Extract recipe IDs
  const recipeIds = mealPlans.map((mealPlan) => mealPlan.recipe_id);

  // 3. Get all ingredients required by those recipes
  const recipeIngredients =
    await getRecipeIngredientsForShoppingList(recipeIds);

  // 4. Get user's pantry items
  const pantryItems = await getPantryItemsForShoppingList(user_id);

  // 5. Combine same ingredients from multiple recipes
  const requiredIngredients = {};

  for (const ingredient of recipeIngredients) {
    const key = `${ingredient.ingredient_name.toLowerCase()}-${ingredient.unit.toLowerCase()}`;

    if (requiredIngredients[key]) {
      requiredIngredients[key].quantity += Number(ingredient.quantity);
    } else {
      requiredIngredients[key] = {
        ingredient_name: ingredient.ingredient_name,
        quantity: Number(ingredient.quantity),
        unit: ingredient.unit,
      };
    }
  }

  // 6. Create a lookup object for pantry items
  const pantryMap = {};

  for (const pantryItem of pantryItems) {
    const key = `${pantryItem.ingredient_name.toLowerCase()}-${pantryItem.unit.toLowerCase()}`;

    pantryMap[key] = Number(pantryItem.quantity);
  }

  // 7. Compare required ingredients with pantry
  const shoppingList = [];

  for (const key in requiredIngredients) {
    const requiredIngredient = requiredIngredients[key];

    const pantryQuantity = pantryMap[key] ?? 0;

    const requiredQuantity = requiredIngredient.quantity;

    const quantityToBuy = requiredQuantity - pantryQuantity;

    // Only add if user does not have enough
    if (quantityToBuy > 0) {
      shoppingList.push({
        ingredient_name: requiredIngredient.ingredient_name,
        required_quantity: requiredQuantity,
        pantry_quantity: pantryQuantity,
        quantity_to_buy: quantityToBuy,
        unit: requiredIngredient.unit,
      });
    }
  }

  return shoppingList;
};
