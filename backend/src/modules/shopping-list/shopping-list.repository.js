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

export const createShoppingListItem = async ({
  user_id,
  week_start_date,
  ingredient_name,
  required_quantity,
  quantity_to_buy,
  unit,
}) => {
  const query = `
    INSERT INTO shopping_list (
      user_id,
      week_start_date,
      ingredient_name,
      required_quantity,
      purchased_quantity,
      quantity_to_buy,
      unit,
      status
    )
    VALUES ($1, $2, $3, $4, 0, $5, $6, 'PENDING')
    RETURNING *;
  `;
  const values = [
    user_id,
    week_start_date,
    ingredient_name,
    required_quantity,
    quantity_to_buy,
    unit,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0]
};

export const getExistingShoppingList = async ({user_id, week_start_date}) => {
  const query = `
    SELECT
      id,
      ingredient_name,
      quantity,
      unit,
      status,
      week_start_date
    FROM shopping_list
    WHERE user_id = $1
      AND week_start_date = $2
    ORDER BY id ASC;
  `;

  const { rows } = await pool.query(query, [
    user_id,
    week_start_date,
  ]);

  return rows;
}

export const upsertShoppingListItem = async ({
  user_id,
  week_start_date,
  ingredient_name,
  required_quantity,
  purchased_quantity,
  unit,
}) => {
  const query = `
    INSERT INTO shopping_list (
      user_id,
      week_start_date,
      ingredient_name,
      required_quantity,
      purchased_quantity,
      quantity_to_buy,
      unit,
      status
    )
    VALUES (
      $1,
      $2,
      $3,
      $4::NUMERIC,
      $5::NUMERIC,
      GREATEST($4::NUMERIC - $5::NUMERIC, 0),
      $6,
      CASE
        WHEN $4::NUMERIC - $5::NUMERIC <= 0
        THEN 'PURCHASED'
        ELSE 'PENDING'
      END
    )

    ON CONFLICT (
      user_id,
      week_start_date,
      ingredient_name,
      unit
    )
    DO UPDATE SET
      required_quantity = EXCLUDED.required_quantity,

      quantity_to_buy = GREATEST(
        EXCLUDED.required_quantity
        - shopping_list.purchased_quantity,
        0
      ),

      status = CASE
        WHEN EXCLUDED.required_quantity
             <= shopping_list.purchased_quantity
        THEN 'PURCHASED'
        ELSE 'PENDING'
      END,

      updated_at = CURRENT_TIMESTAMP

    RETURNING *;
  `;

  const values = [
    user_id,
    week_start_date,
    ingredient_name,
    required_quantity,
    purchased_quantity,
    unit,
  ];

  console.log("UPSERT VALUES:", values);

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const updateShoppingListStatus = async ({
  id,
  user_id,
  status,
}) => {
  const query = `
    UPDATE shopping_list
    SET
      purchased_quantity = CASE
        WHEN $1 = 'PURCHASED'
        THEN required_quantity
        ELSE 0
      END,

      quantity_to_buy = CASE
        WHEN $1 = 'PURCHASED'
        THEN 0
        ELSE required_quantity
      END,

      status = $1,

      updated_at = CURRENT_TIMESTAMP

    WHERE id = $2
      AND user_id = $3

    RETURNING *;
  `;

  const values = [status, id, user_id];

  console.log("UPDATE STATUS VALUES:", values);

  const { rows } = await pool.query(query, values);

  return rows[0];
};