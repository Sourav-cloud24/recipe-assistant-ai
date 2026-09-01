import {
  getMealPlansForShoppingList,
  getRecipeIngredientsForShoppingList,
  getPantryItemsForShoppingList,
  createShoppingListItem,
  upsertShoppingListItem,
  updateShoppingListStatus,
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
  const recipeCounts = {};

  for (const mealPlan of mealPlans) {
    const recipeId = mealPlan.recipe_id;

    if (recipeCounts[recipeId]) {
      recipeCounts[recipeId] += 1;
    } else {
      recipeCounts[recipeId] = 1;
    }
  }

  console.log("RECIPE COUNTS:", recipeCounts);

  const recipeIds = Object.keys(recipeCounts);

  console.log("UNIQUE RECIPE IDS:", recipeIds);

  // 3. Get all ingredients required by those recipes
  const recipeIngredients =
    await getRecipeIngredientsForShoppingList(recipeIds);

  // 4. Get user's pantry items
  const pantryItems = await getPantryItemsForShoppingList(user_id);

  // 5. Combine same ingredients from multiple recipes
  const requiredIngredients = {};

  for (const ingredient of recipeIngredients) {
    const recipeCount = recipeCounts[ingredient.recipe_id] ?? 1;

    const key = ingredient.ingredient_name.trim().toLowerCase();

    const totalQuantity = Number(ingredient.quantity) * recipeCount;

    if (requiredIngredients[key]) {
      requiredIngredients[key].quantity += totalQuantity;
    } else {
      requiredIngredients[key] = {
        ingredient_name: ingredient.ingredient_name,
        quantity: totalQuantity,
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

  for (const item of shoppingList) {
    const savedItem = await upsertShoppingListItem({
      user_id,
      week_start_date: start_date,
      ingredient_name: item.ingredient_name,
      required_quantity: item.required_quantity,
      purchased_quantity: 0,
      unit: item.unit,
    });

    // Add database information to the shopping item
    item.id = savedItem.id;
    item.status = savedItem.status;
    console.log("SAVED ITEM:", savedItem);
  }

  return shoppingList;
};

export const updateShoppingListStatusService = async ({id, user_id, status}) => {
  const item = await updateShoppingListStatus({
    id,
    user_id,
    status,
  });

  if (!item) {
    throw new Error("Shopping list item not found");
  }
  console.log("UPDATE SHOPPING LIST STATUS SERVICE:", item)
  return item;
};
