import { errorResponse, successResponse } from "../../utils/response.js";
import {
  getAllSavedRecipes,
  getRecipeDetails,
  removeRecipe,
  saveRecipe,
} from "./recipe.service.js";

export const craeteRecipeController = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("REQ BODY -->", req.body);
    const recipeData = {
      ...req.body,
      user_id: userId,
    };

    const recipe = await saveRecipe(recipeData);

    return successResponse(res, {
      statusCode: 201,
      message: "Recipe saved successfully",
      data: recipe,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const getSavedRecipesController = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const recipes = await getAllSavedRecipes(userId);

    return successResponse(res, {
      statusCode: 200,
      message: "Recipes retrieved successfully",
      data: recipes,
    });
  } catch (error) {
    console.error("Get saved recipes error:", error);

    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const getRecipeDetailsController = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const recipeId = Number(req.params.id);

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid recipe ID",
      });
    }

    const recipe = await getRecipeDetails({
      id: recipeId,
      user_id: userId,
    });

    if (!recipe) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Recipe not found",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Recipe retrieved successfully",
      data: recipe,
    });
  } catch (error) {
    console.error("Get recipe details error:", error);

    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const deleteRecipeController = async (req, res) => {
  try {
    const recipeId = Number(req.params.id);
    const userId = req.user.id;

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid recipe ID",
      });
    }

    const deletedRecipe = await removeRecipe({
      id: recipeId,
      user_id: userId,
    });

    if (!deletedRecipe) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Recipe not found",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Recipe deleted successfully",
      data: deletedRecipe,
    });
  } catch (error) {
    console.error("Delete recipe error:", error);

    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};
