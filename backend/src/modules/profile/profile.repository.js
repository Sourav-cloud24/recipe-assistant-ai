import pool from "../../config/db.js";

export const getUserProfile = async(user_id) => {
    const query = `
        SELECT
            id,
            fullname,
            email,
            created_at,
            updated_at
        FROM users
        WHERE id = $1
    `;
    const {rows} = await pool.query(query, [user_id])

    return rows[0] || null
}