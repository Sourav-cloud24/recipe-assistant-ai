import pool from "../../config/db.js";

export const createPantryItem = async ({
  user_id,
  ingredient_name,
  quantity,
  unit,
  category,
  expiry_date,
  is_low_stock,
}) => {
  const query = `
    INSERT INTO pantry_items (
        user_id,
        ingredient_name,
        quantity,
        unit,
        category,
        expiry_date,
        is_low_stock
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;

  const values = [
    user_id,
    ingredient_name,
    quantity,
    unit,
    category,
    expiry_date,
    is_low_stock,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getPantryItems = async (user_id) => {
  const query = `
    SELECT * FROM pantry_items
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const { rows } = await pool.query(query, [user_id]);
  console.log("Retrieved pantry items:", rows); 

  return rows;
};