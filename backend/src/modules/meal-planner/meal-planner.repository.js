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
  // console.log("rows-->", rows[0])

  return rows[0];
};

export const getMealPlansByUser = async (user_id, start_date, end_date) => {
  //   console.log("REPOSITORY user_id:", user_id);
  // console.log("REPOSITORY start_date:", start_date);
  // console.log("REPOSITORY end_date:", end_date);
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
    AND mp.meal_date BETWEEN $2 AND $3

    ORDER BY mp.meal_date ASC,
      CASE mp.meal_type
        WHEN 'BREAKFAST' THEN 1
        WHEN 'LUNCH' THEN 2
        WHEN 'SNACK' THEN 3
        WHEN 'DINNER' THEN 4
      END;
  `;

  const values = [user_id, start_date, end_date];
  // console.log("QUERY VALUES:", values);
  const { rows } = await pool.query(query, values);
// console.log("REPOSITORY ROWS:", rows);
  return rows;
};
