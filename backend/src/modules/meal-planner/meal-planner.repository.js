import pool from "../../config/db.js";

export const createMealPlan = async ({
  user_id,
  recipe_id,
  meal_date,
  meal_type,
  notes,
}) => {
  const query = `
        INSERT INTO meal_plans (
            user_id,
            recipe_id,
            meal_date,
            meal_type,
            notes      
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;

  const values = [user_id, recipe_id, meal_date, meal_type, notes ?? null];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getMealPlansByUser = async (user_id) => {
  const query = `
    SELECT
      mp.id,
      mp.meal_date,
      mp.meal_type,
      mp.notes,

      r.id AS recipe_id,
      r.title,
      r.description,
      r.cuisine,
      r.diet,
      r.cooking_time,
      r.servings

    FROM meal_plans mp

    INNER JOIN recipes r
      ON mp.recipe_id = r.id

    WHERE mp.user_id = $1

    ORDER BY mp.meal_date ASC,
             CASE mp.meal_type
               WHEN 'BREAKFAST' THEN 1
               WHEN 'LUNCH' THEN 2
               WHEN 'SNACK' THEN 3
               WHEN 'DINNER' THEN 4
             END;
  `;

  const { rows } = await pool.query(query, [user_id]);

  return rows;
};
