"use client"
import { usePantryItems } from "@/features/pantry/hooks/usePantryItems";
import RecipeGPT from "./RecipeGPT";
import { useEffect, useState } from "react";
import GeneratedRecipe from "./GeneratedRecipe";
import { PantryItem } from "@/features/pantry/types/pantry.types";
import { useGenerateAIRecipe } from "../hooks/useGenerateAIRecipe";
import { GenerateRecipeRequest } from "../types/recipe.type";
import { useSaveAIRecipe } from "../hooks/useSaveAIRecipe";


const AiRecipeContainer = () => {

    const [pantryItems, setPantryItems] = useState<PantryItem[]>([])
      const {
        data: pantryResponse,
        isLoading,
        isError,
        error,
      } = usePantryItems();
     useEffect(() => {
    if (pantryResponse?.data) {
      setPantryItems(pantryResponse?.data);
    }
  }, [pantryResponse]);

  const generateRecipe = useGenerateAIRecipe()
  const saveRecipe = useSaveAIRecipe()
  const handleGenerateRecipe = (data: GenerateRecipeRequest) => {
    generateRecipe.mutate(data)
  }

  const aiRecipe = generateRecipe?.data;

  const saveAIRecipe = (recipe: GeneratedRecipe) => {
    console.log("RECIPE-->", recipe)
    saveRecipe.mutate(recipe)
  }

  return (
    <div>
      <header className="w-80 flex gap-1.5">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C86B38] text-xl">
              ✨
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">AI Recipe Generator</h1>
          <p className="text-sm mt-1.5 text-white/45">
            Tell our AI what you have and what you like and get the perfect
            recipe in seconds
          </p>
        </div>
      </header>
      <div className="flex gap-2.5">
        <RecipeGPT pantryItems={pantryItems} onGenerate={handleGenerateRecipe} />
        {generateRecipe.isSuccess && aiRecipe && (
        <GeneratedRecipe recipe={aiRecipe} onSave={saveAIRecipe}/>
      )}
      </div>
    </div>
  );
};

export default AiRecipeContainer;




// {
//     "title": "Paneer Bhurji",
//     "description": "A quick and flavorful Indian scramble made with crumbled paneer (Indian cottage cheese), onions, tomatoes, and spices. It's a popular vegetarian dish that can be served for breakfast, lunch, or dinner.",
//     "ingredients": [
//         {
//             "name": "Paneer",
//             "quantity": "200",
//             "unit": "grams"
//         },
//         {
//             "name": "Onion",
//             "quantity": "1",
//             "unit": "medium, finely chopped"
//         },
//         {
//             "name": "Tomato",
//             "quantity": "1",
//             "unit": "medium, finely chopped"
//         },
//         {
//             "name": "Green Chilies",
//             "quantity": "1-2",
//             "unit": "chopped (adjust to taste)"
//         },
//         {
//             "name": "Ginger-Garlic Paste",
//             "quantity": "1",
//             "unit": "teaspoon"
//         },
//         {
//             "name": "Turmeric Powder",
//             "quantity": "0.25",
//             "unit": "teaspoon"
//         },
//         {
//             "name": "Red Chili Powder",
//             "quantity": "0.5",
//             "unit": "teaspoon (adjust to taste)"
//         },
//         {
//             "name": "Coriander Powder",
//             "quantity": "1",
//             "unit": "teaspoon"
//         },
//         {
//             "name": "Garam Masala",
//             "quantity": "0.5",
//             "unit": "teaspoon"
//         },
//         {
//             "name": "Oil or Ghee",
//             "quantity": "2",
//             "unit": "tablespoons"
//         },
//         {
//             "name": "Salt",
//             "quantity": "to",
//             "unit": "taste"
//         },
//         {
//             "name": "Fresh Cilantro",
//             "quantity": "2",
//             "unit": "tablespoons, chopped (for garnish)"
//         }
//     ],
//     "instructions": [
//         "Crumble the paneer and set aside. You can grate it or just break it into small pieces with your hands.",
//         "Heat oil or ghee in a pan over medium heat. Add the finely chopped onion and sauté until it turns translucent, about 3-5 minutes.",
//         "Add the green chilies and ginger-garlic paste. Sauté for another minute until the raw smell disappears.",
//         "Stir in the finely chopped tomato and cook until it softens and the oil starts to separate from the mixture, about 5-7 minutes.",
//         "Add turmeric powder, red chili powder, coriander powder, and salt. Mix well and cook for 1-2 minutes, stirring continuously, allowing the spices to cook through.",
//         "Add the crumbled paneer to the pan. Mix gently to combine the paneer with the spice mixture. Cook for 2-3 minutes, ensuring the paneer is heated through but not overcooked (which can make it tough).",
//         "Sprinkle garam masala and fresh cilantro. Give it a final gentle stir.",
//         "Serve hot with roti, paratha, bread, or as a side dish."
//     ],
//     "cooking_time": 20,
//     "servings": 2,
//     "nutrition": null,
//     "tips": [
//         "For a richer flavor, use ghee instead of oil.",
//         "If you prefer a slightly tangy taste, add a squeeze of lemon juice or a pinch of amchur (dry mango powder) at the end.",
//         "Don't overcook the paneer, as it can become rubbery. Just heat it through until combined with the spices."
//     ]
// }