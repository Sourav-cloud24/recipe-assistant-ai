import { createPantryItem, getPantryItems, getPantryItemById, updatePantryItem, deletePantryItemRepo } from "./pantry.repository.js";

export const addPantryItem = async ({
  user_id,
  ingredient_name,
  quantity,
  unit,
  category,
  expiry_date,
  is_low_stock,
}) => {
  if (!ingredient_name?.trim()) {
    throw new Error("Ingredient name is required.");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0.");
  }
  
  const newPantryItem = await createPantryItem({
    user_id,
    ingredient_name,
    quantity,
    unit,
    category,
    expiry_date,
    is_low_stock,
  });

  return newPantryItem;
};

export const getUserPantryItems = async ({user_id, search}) => {
  const pantryItems = await getPantryItems({user_id, search});
  console.log("Retrieved user pantry items:", pantryItems);
  
  return pantryItems;
}

export const getPantryItemByIdService = async ({id, user_id}) => {
  const pantryItem = await getPantryItemById({id, user_id});
  return pantryItem;
};

export const updatePantryItemService = async ({
  id,
  user_id,
  ingredient_name,
  quantity,
  unit,
  category,
  expiry_date,
  is_low_stock,
}) => {
  const updatedPantryItem = await updatePantryItem({
    id,
    user_id,
    ingredient_name,
    quantity,
    unit,
    category,
    expiry_date,
    is_low_stock,
  })

  if (!updatedPantryItem) {
    throw new Error("Pantry item not found or you do not have permission to update it.");
  }

  return updatedPantryItem;
}

export const deletePantryItemService = async ({id, user_id}) => {
  const deletedPantryItem = await deletePantryItemRepo({id, user_id});
  if (!deletedPantryItem) {
    throw new Error("Pantry item not found or you do not have permission to delete it.");
  }
  return deletedPantryItem;
}