import { createPantryItem, getPantryItems } from "./pantry.repository";

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

export const getUserPantryItems = async (user_id) => {
  const pantryItems = await getPantryItems(user_id);
  
  return pantryItems;
}