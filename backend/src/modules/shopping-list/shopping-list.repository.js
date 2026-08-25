import pool from "../../config/db.js";

export const getMealPlansForShoppingList = async (
  user_id,
  start_date,
  end_date,
) => {
  const query = `
    SELECT
      mp.meal_date,
      mp.meal_type,
      mp.recipe_id
    FROM meal_plans mp
    WHERE mp.user_id = $1
      AND mp.meal_date BETWEEN $2 AND $3
    ORDER BY mp.meal_date ASC;
  `;

  const values = [user_id, start_date, end_date];

  const { rows } = await pool.query(query, values);

  return rows;
};

export const getRecipeIngredientsForShoppingList = async (recipeIds) => {
  const query = `
    SELECT 
        ri.recipe_id,
        ri.ingredient_name,
        ri.quantity,
        ri.unit
    FROM recipe_ingredients ri
    WHERE ri.recipe_id = ANY($1::int[])
    ORDER BY ri.recipe_id
    `;

  const { rows } = await pool.query(query, [recipeIds]);

  return rows;
};

export const getPantryItemsForShoppingList = async (user_id) => {
  const query = `
    SELECT
      ingredient_name,
      quantity,
      unit
    FROM pantry_items
    WHERE user_id = $1
    ORDER BY ingredient_name ASC;
  `;

  const { rows } = await pool.query(query, [user_id]);

  return rows;
};
