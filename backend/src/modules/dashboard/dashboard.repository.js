import pool from "../../config/db.js"

export const getPantryOverview = async (user_id) => {
    const query = `
        SELECT 
            COUNT(*) AS total_items,
            COUNT(*) FILTER (
                WHERE is_low_stock = TRUE
            ) AS low_stock_items,
            COUNT(*) FILTER (
                WHERE expiry_date IS NOT NULL
                AND expiry_date >= CURRENT_DATE
                AND expiry_date <= CURRENT_DATE + INTERVAL '7 days'
            ) AS expiring_soon_items
        FROM pantry_items
        WHERE user_id = $1;
    `;

    const values = [user_id];

    const { rows } = await pool.query(query, values);

    return rows[0];
}

export const getUpcomingMeals = async (user_id, week_start_date) => {
  const query = `
    SELECT
      mp.id,
      mp.meal_date,
      mp.meal_type,
      mp.notes,
      r.id AS recipe_id,
      r.title AS recipe_title
    FROM meal_plans mp
    JOIN recipes r
      ON mp.recipe_id = r.id
    WHERE mp.user_id = $1
      AND mp.meal_date >= $2
      AND mp.meal_date < $2::date + INTERVAL '7 days'
    ORDER BY mp.meal_date ASC
  `;

  const values = [user_id, week_start_date];

  const { rows } = await pool.query(query, values);

  return rows;
};

export const getShoppingListOverview = async (user_id, week_start_date) => {
  const query = `
    SELECT 
      COUNT(*) AS total_items,
      COUNT(*) FILTER (
        WHERE status = 'PENDING'
      ) AS pending_items,
      COUNT(*) FILTER (
        WHERE status = 'PURCHASED'
      ) AS purchased_items
    FROM shopping_list
    WHERE user_id = $1
      AND week_start_date = $2;
  `;

  const values = [user_id, week_start_date]

  const {rows} = await pool.query(query, values)

  return rows[0];
}

export const getRecentRecipes = async (user_id) => {
  const query = `
    SELECT
      id,
      title,
      description,
      cuisine,
      diet,
      cooking_time,
      servings,
      source,
      created_at
    FROM recipes
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 5;
  `;

  const values = [user_id];

  const { rows } = await pool.query(query, values);

  return rows;
};