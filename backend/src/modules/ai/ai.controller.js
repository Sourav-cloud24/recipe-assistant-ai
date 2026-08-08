import { generateRecipe } from "./ai.service.js";

export const generateRecipeController = async (req, res) => {
  try {
    const recipeData = req.body;
    const result = await generateRecipe(recipeData);
    res.status(200).json(result);
  } catch (error) {
    console.error("AI recipe generation error:", error);

    return res.status(500).json({
      message: "Failed to generate recipe",
    });
  }
};
