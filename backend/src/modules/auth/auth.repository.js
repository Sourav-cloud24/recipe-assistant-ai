import pool from "../../config/db.js";

export const findUserByEmail = async (email) => {
  const query = `
      SELECT *
      FROM users
      WHERE email = $1
    `;

  const { rows } = await pool.query(query, [email]);

  return rows[0] || null;
};

export const createUser = async ({ fullname, email, passwordHash }) => {
  const query = `
    INSERT INTO users (
        fullname,
        email,
        password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING id, fullname, email, created_at
    `;

  const values = [fullname, email, passwordHash];

  const { rows } = await pool.query(query, values);

  return rows[0];
};
