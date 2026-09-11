import {
  getMealPlansForShoppingList,
  getRecipeIngredientsForShoppingList,
  getPantryItemsForShoppingList,
  createShoppingListItem,
  upsertShoppingListItem,
  updateShoppingListStatus,
  getExistingShoppingList,
} from "./shopping-list.repository.js";

export const getShoppingList = async (user_id, start_date, end_date) => {
  // --------------------------------------------------
  // 1. Get meal plans for selected week
  // --------------------------------------------------

  const mealPlans = await getMealPlansForShoppingList(
    user_id,
    start_date,
    end_date,
  );

  if (mealPlans.length === 0) {
    return [];
  }

  // --------------------------------------------------
  // 2. Count recipes
  // --------------------------------------------------

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

  // --------------------------------------------------
  // 3. Get unique recipe IDs
  // --------------------------------------------------

  const recipeIds = Object.keys(recipeCounts);

  console.log("UNIQUE RECIPE IDS:", recipeIds);

  // --------------------------------------------------
  // 4. Get recipe ingredients
  // --------------------------------------------------

  const recipeIngredients =
    await getRecipeIngredientsForShoppingList(recipeIds);

  // --------------------------------------------------
  // 5. Get pantry items
  // --------------------------------------------------

  const pantryItems = await getPantryItemsForShoppingList(user_id);

  // --------------------------------------------------
  // 6. Get existing shopping list
  // --------------------------------------------------

  const existingShoppingList = await getExistingShoppingList({
    user_id,
    week_start_date: start_date,
  });

  // --------------------------------------------------
  // 7. Create pantry lookup
  // --------------------------------------------------

  const pantryMap = {};

  for (const pantryItem of pantryItems) {
    const key = `${pantryItem.ingredient_name.trim().toLowerCase()}-${pantryItem.unit.trim().toLowerCase()}`;

    pantryMap[key] = Number(pantryItem.quantity);
  }

  // --------------------------------------------------
  // 8. Create existing shopping-list lookup
  // --------------------------------------------------

  const existingShoppingMap = {};

  for (const item of existingShoppingList) {
    const key = `${item.ingredient_name.trim().toLowerCase()}-${item.unit.trim().toLowerCase()}`;

    existingShoppingMap[key] = {
      id: item.id,

      required_quantity: Number(item.required_quantity),

      purchased_quantity: Number(item.purchased_quantity),

      quantity_to_buy: Number(item.quantity_to_buy),

      status: item.status,
    };
  }

  // --------------------------------------------------
  // 9. Calculate TOTAL ingredient requirement
  // --------------------------------------------------

  const requiredIngredients = {};

  for (const ingredient of recipeIngredients) {
    const recipeCount = recipeCounts[ingredient.recipe_id] ?? 1;

    const quantity = Number(ingredient.quantity);

    // Ignore invalid quantities
    if (Number.isNaN(quantity)) {
      console.warn("Invalid ingredient quantity:", ingredient);

      continue;
    }

    const key = `${ingredient.ingredient_name.trim().toLowerCase()}-${ingredient.unit.trim().toLowerCase()}`;

    const totalQuantity = quantity * recipeCount;

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

  // --------------------------------------------------
  // 10. Calculate shopping list
  // --------------------------------------------------

const shoppingList = [];

for (const key in requiredIngredients) {
  const requiredIngredient = requiredIngredients[key];

  const totalRequiredQuantity =
    requiredIngredient.quantity;

  const existingItem =
    existingShoppingMap[key];

  const pantryQuantity =
    pantryMap[key] ?? 0;

  // Amount already purchased previously
  const purchasedQuantity =
    existingItem?.purchased_quantity ?? 0;

  /*
    Example:

    Total requirement = 300g
    Already purchased = 100g

    300 - 100 = 200g still needed
  */

  const quantityToBuy = Math.max(
    totalRequiredQuantity -
      purchasedQuantity -
      pantryQuantity,
    0,
  );

  const status =
    quantityToBuy > 0
      ? "PENDING"
      : "PURCHASED";

  console.log("SHOPPING CALCULATION:", {
    ingredient:
      requiredIngredient.ingredient_name,

    totalRequiredQuantity,

    purchasedQuantity,

    pantryQuantity,

    quantityToBuy,

    status,
  });

  shoppingList.push({
    ingredient_name:
      requiredIngredient.ingredient_name,

    required_quantity:
      totalRequiredQuantity,

    pantry_quantity:
      pantryQuantity,

    quantity_to_buy:
      quantityToBuy,

    unit:
      requiredIngredient.unit,

    id:
      existingItem?.id ?? null,

    status,
  });
}

  // --------------------------------------------------
  // 11. Save latest shopping-list state
  // --------------------------------------------------

  for (const item of shoppingList) {
    const savedItem = await upsertShoppingListItem({
      user_id,
      week_start_date: start_date,
      ingredient_name: item.ingredient_name,
      required_quantity: item.required_quantity,
      quantity_to_buy: item.quantity_to_buy,
      unit: item.unit,
      status: item.status,
    });

    item.id = savedItem.id;
    item.status = savedItem.status;
  }

    return shoppingList;
  };

export const updateShoppingListStatusService = async ({
  id,
  user_id,
  status,
}) => {
  const item = await updateShoppingListStatus({
    id,
    user_id,
    status,
  });

  if (!item) {
    throw new Error("Shopping list item not found");
  }

  console.log(
    "UPDATE SHOPPING LIST STATUS SERVICE:",
    item,
  );

  return item;
};
