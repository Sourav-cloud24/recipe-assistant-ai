import pool from "../../config/db.js";

export const createRecipe = async ({
  user_id,
  title,
  description,
  cuisine,
  diet,
  cooking_time,
  servings,
  ingredients,
  instructions,
  nutrition,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Save main recipe
    const recipeQuery = `
      INSERT INTO recipes (
        user_id,
        title,
        description,
        cuisine,
        diet,
        cooking_time,
        servings
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const recipeValues = [
      user_id,
      title,
      description,
      cuisine,
      diet,
      cooking_time,
      servings,
    ];

    const { rows } = await client.query(recipeQuery, recipeValues);

    const recipe = rows[0];
    const recipeId = recipe.id;

    // 2. Save ingredients
    for (const ingredient of ingredients) {
      const ingredientQuery = `
        INSERT INTO recipe_ingredients (
          recipe_id,
          ingredient_name,
          quantity,
          unit
        )
        VALUES ($1, $2, $3, $4);
      `;

      await client.query(ingredientQuery, [
        recipeId,
        ingredient.name,
        ingredient.quantity,
        ingredient.unit,
      ]);
    }

    // 3. Save instructions
    for (let i = 0; i < instructions.length; i++) {
      const instructionQuery = `
        INSERT INTO recipe_instructions (
          recipe_id,
          step_number,
          instruction
        )
        VALUES ($1, $2, $3);
      `;

      await client.query(instructionQuery, [
        recipeId,
        i + 1,
        instructions[i],
      ]);
    }

    // 4. Save nutrition
    if (nutrition) {
      const nutritionQuery = `
        INSERT INTO recipe_nutrition (
          recipe_id,
          calories,
          protein,
          carbohydrates,
          fat
        )
        VALUES ($1, $2, $3, $4, $5);
      `;

      await client.query(nutritionQuery, [
        recipeId,
        nutrition.calories,
        nutrition.protein,
        nutrition.carbohydrates,
        nutrition.fat,
      ]);
    }

    await client.query("COMMIT");

    return recipe;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getSavedRecipes = async ({ user_id }) => {
  const query = `
    SELECT
      id,
      title,
      description,
      cuisine,
      diet,
      cooking_time,
      servings,
      created_at
    FROM recipes
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const { rows } = await pool.query(query, [user_id]);

  return rows;
};

export const getRecipeById = async ({ id, user_id }) => {
  const client = await pool.connect();

  try {
    // 1. Get main recipe
    const recipeQuery = `
      SELECT
        id,
        user_id,
        title,
        description,
        cuisine,
        diet,
        cooking_time,
        servings,
        created_at,
        updated_at
      FROM recipes
      WHERE id = $1
        AND user_id = $2;
    `;

    const { rows: recipeRows } = await client.query(recipeQuery, [
      id,
      user_id,
    ]);

    if (recipeRows.length === 0) {
      return null;
    }

    const recipe = recipeRows[0];

    // 2. Get ingredients
    const ingredientsQuery = `
      SELECT
        id,
        ingredient_name AS name,
        quantity,
        unit
      FROM recipe_ingredients
      WHERE recipe_id = $1
      ORDER BY id;
    `;

    const { rows: ingredients } = await client.query(
      ingredientsQuery,
      [id]
    );

    // 3. Get instructions
    const instructionsQuery = `
      SELECT
        id,
        step_number,
        instruction
      FROM recipe_instructions
      WHERE recipe_id = $1
      ORDER BY step_number;
    `;

    const { rows: instructions } = await client.query(
      instructionsQuery,
      [id]
    );

    // 4. Get nutrition
    const nutritionQuery = `
      SELECT
        calories,
        protein,
        carbohydrates,
        fat
      FROM recipe_nutrition
      WHERE recipe_id = $1;
    `;

    const { rows: nutritionRows } = await client.query(
      nutritionQuery,
      [id]
    );

    return {
      ...recipe,

      ingredients,

      instructions,

      nutrition: nutritionRows[0] || null,
    };
  } finally {
    client.release();
  }
};