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