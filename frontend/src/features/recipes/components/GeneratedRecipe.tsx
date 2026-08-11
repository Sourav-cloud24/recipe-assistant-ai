"use client";

import type { GeneratedRecipe, GenerateRecipeRequest } from "../types/recipe.type";

interface GeneratedRecipeProps {
  recipe: GeneratedRecipe;
  onSave: (recipe: GeneratedRecipe) => void;
}

const GeneratedRecipe = ({
  recipe,
  onSave
}: GeneratedRecipeProps) => {

  const handleSave = () => {
    onSave(recipe)
  }
  return (
    <section className="rounded-2xl border border-[#344238] bg-[#223027] p-6 text-[#F3EEDF] shadow-2xl">

      {/* Header */}
      <div className="mb-6">

        <div className="mb-3 flex items-center justify-between">

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#C86B38]">
              AI Generated Recipe
            </p>

            <h2 className="text-2xl font-semibold">
              {recipe?.title}
            </h2>
          </div>

          <span className="rounded-full bg-[#C86B38]/15 px-3 py-1.5 text-xs text-[#E8A06F]">
            ✨ AI Recipe
          </span>

        </div>

        <p className="max-w-2xl text-sm leading-6 text-[#A8A99A]">
          {recipe?.description}
        </p>

      </div>

      {/* Recipe Metadata */}
      <div className="mb-7 grid grid-cols-3 gap-3">

        <div className="rounded-xl border border-[#344238] bg-[#18251C] p-4">
          <p className="text-xs text-[#68746B]">
            Cooking time
          </p>

          <p className="mt-1 text-sm font-medium">
            {recipe?.cooking_time} min
          </p>
        </div>

        <div className="rounded-xl border border-[#344238] bg-[#18251C] p-4">
          <p className="text-xs text-[#68746B]">
            Servings
          </p>

          <p className="mt-1 text-sm font-medium">
            {recipe?.servings}
          </p>
        </div>

        <div className="rounded-xl border border-[#344238] bg-[#18251C] p-4">
          <p className="text-xs text-[#68746B]">
            Difficulty
          </p>

          {/* <p className="mt-1 text-sm font-medium">
            {recipe?.difficulty}
          </p> */}
        </div>

      </div>

      {/* Ingredients */}
      <div className="mb-8">

        <h3 className="mb-4 text-lg font-semibold">
          Ingredients
        </h3>

        <div className="grid gap-2 sm:grid-cols-2">

          {recipe.ingredients.map(
            (ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-[#344238] bg-[#18251C] px-4 py-3"
              >
                <span className="text-sm text-[#C5C9BE]">
                  {ingredient?.name}
                </span>

                <span className="text-sm font-medium text-[#E8A06F]">
                  {ingredient?.quantity}
                </span>
              </div>
            ),
          )}

        </div>

      </div>

      {/* Instructions */}
      <div className="mb-8">

        <h3 className="mb-4 text-lg font-semibold">
          Instructions
        </h3>

        <div className="space-y-4">

          {recipe.instructions.map(
            (instruction, index) => (
              <div
                key={index}
                className="flex gap-4"
              >

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C86B38] text-sm font-semibold text-white">
                  {index + 1}
                </div>

                <p className="pt-1 text-sm leading-6 text-[#C5C9BE]">
                  {instruction}
                </p>

              </div>
            ),
          )}

        </div>

      </div>

      {/* Nutrition */}
      <div>

        <h3 className="mb-4 text-lg font-semibold">
          Nutrition
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          <div className="rounded-xl border border-[#344238] bg-[#18251C] p-4 text-center">
            <p className="text-xs text-[#68746B]">
              Calories
            </p>

            <p className="mt-1 font-semibold">
              {recipe?.nutrition?.calories}
            </p>
          </div>

          <div className="rounded-xl border border-[#344238] bg-[#18251C] p-4 text-center">
            <p className="text-xs text-[#68746B]">
              Protein
            </p>

            <p className="mt-1 font-semibold">
              {recipe?.nutrition?.protein}
            </p>
          </div>

          <div className="rounded-xl border border-[#344238] bg-[#18251C] p-4 text-center">
            <p className="text-xs text-[#68746B]">
              Carbs
            </p>

            {/* <p className="mt-1 font-semibold">
              {recipe?.nutrition?.carbs}
            </p> */}
          </div>

          <div className="rounded-xl border border-[#344238] bg-[#18251C] p-4 text-center">
            <p className="text-xs text-[#68746B]">
              Fat
            </p>

            <p className="mt-1 font-semibold">
              {recipe?.nutrition?.fat}
            </p>
          </div>

        </div>

      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3 border-t border-[#344238] pt-6">

        <button
          type="button"
          onClick={() => handleSave()}
          className="rounded-xl bg-[#C86B38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9824A]"
        >
          💾 Save Recipe
        </button>

        <button
          type="button"
          className="rounded-xl border border-[#344238] bg-[#18251C] px-5 py-3 text-sm text-[#C5C9BE] transition hover:border-[#C86B38] hover:text-white"
        >
          🔄 Generate Another
        </button>

      </div>

    </section>
  );
};

export default GeneratedRecipe;