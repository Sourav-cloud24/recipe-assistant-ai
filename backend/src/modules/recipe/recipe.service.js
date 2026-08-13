import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  getSavedRecipes,
} from "./recipe.repository.js";

export const saveRecipe = async (recipeData) => {
  const recipe = await createRecipe(recipeData);

  return recipe;
};

export const getAllSavedRecipes = async (user_id) => {
  return await getSavedRecipes({ user_id });
};

export const getRecipeDetails = async ({ id, user_id }) => {
  return await getRecipeById({
    id,
    user_id,
  });
};

export const removeRecipe = async ({ id, user_id }) => {
  return await deleteRecipe({ id, user_id });
};
