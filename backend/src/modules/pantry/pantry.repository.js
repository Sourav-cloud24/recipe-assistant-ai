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

export const getPantryItems = async ({user_id, search }) => {
  const query = `
    SELECT * FROM pantry_items
    WHERE user_id = $1
    AND (ingredient_name ILIKE '%' || $2 || '%' OR $2 IS NULL)
    ORDER BY created_at DESC
  `;

  const { rows } = await pool.query(query, [user_id, search || null]);
  console.log("Retrieved pantry items:", rows); 

  return rows;
};

export const getPantryItemById = async ({id, user_id}) => {
  const query = `
    SELECT * FROM pantry_items
    WHERE id = $1
    AND user_id = $2
  `;

  const { rows } = await pool.query(query, [id, user_id]);
  return rows[0] || null;
};

export const updatePantryItem = async ({
  id,
  user_id,
  ingredient_name,
  quantity,
  unit,
  category,
  expiry_date,
  is_low_stock,
}) => {
  const query = `
    UPDATE pantry_items
    SET 
      ingredient_name = $3,
      quantity = $4,
      unit = $5,
      category = $6,
      expiry_date = $7,
      is_low_stock = $8,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 
      AND user_id = $2
    RETURNING *;
  `;

  const values = [
    id,
    user_id,
    ingredient_name,
    quantity,
    unit,
    category,
    expiry_date,
    is_low_stock,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

export const deletePantryItemRepo = async ({ id, user_id }) => {
  console.log("deletePantryItemRepo");
  
  const query = `
  DELETE FROM pantry_items
  WHERE id = $1 AND user_id = $2
  `;
  const { rows } = await pool.query(query, [id, user_id]);
  return rows[0] || null;
};
