"use client";

import { useParams, useRouter } from "next/navigation";
import { useRecipeDetails } from "../hooks/useRecipeDetails";

const RecipeDetailsContainer = () => {
  const router = useRouter();
  const params = useParams();

  const recipeId = Number(params.id);

  const {
    data: recipeResponse,
    isLoading,
    isError,
    error,
  } = useRecipeDetails(recipeId);

  const recipe = recipeResponse?.data;

  if (isLoading) {
    return (
      <section className="min-h-full bg-[#102016] p-6 text-[#F3EEDF]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 h-5 w-28 animate-pulse rounded bg-[#1B2B20]" />

          <div className="overflow-hidden rounded-2xl border border-[#2D3D32] bg-[#16271C]">
            <div className="h-72 animate-pulse bg-[#1D3023]" />

            <div className="space-y-5 p-7">
              <div className="h-8 w-2/3 animate-pulse rounded bg-[#24372A]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#24372A]" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-[#24372A]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !recipe) {
    return (
      <section className="min-h-full bg-[#102016] p-6 text-[#F3EEDF]">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 text-sm text-[#A8A99A] transition hover:text-[#E8A06F]"
          >
            ← Back to recipes
          </button>

          <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-6">
            <h2 className="text-lg font-semibold text-red-300">
              Recipe not found
            </h2>

            <p className="mt-2 text-sm text-red-200/70">
              {error instanceof Error
                ? error.message
                : "Unable to load this recipe."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-full px-2 py-1.5 text-[#F3EEDF]">
      <div className="mx-auto">

        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-[#A8A99A] transition hover:text-[#E8A06F]"
        >
          ← Back to recipes
        </button>

        {/* Main Recipe Card */}
        <article className="overflow-hidden rounded-2xl border border-[#2D3D32] bg-[#16271C]">

          {/* Hero */}
          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#2A3828] via-[#263A2A] to-[#17261C]">

            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(200,107,56,0.18),transparent_45%)]" />

            <div className="relative text-9xl">
              🍛
            </div>

            {/* AI badge */}
            <span className="absolute left-6 top-6 rounded-full border border-[#C86B38]/30 bg-[#102016]/80 px-4 py-2 text-xs font-medium text-[#E8A06F] backdrop-blur">
              ✨ AI Generated Recipe
            </span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">

            {/* Header */}
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#C86B38]">
                  {recipe.cuisine}
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {recipe.title}
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-[#8E9A90]">
                  {recipe.description}
                </p>
              </div>

              <span className="w-fit rounded-full bg-[#C86B38]/10 px-4 py-2 text-xs text-[#E8A06F]">
                {recipe.diet}
              </span>

            </div>

            {/* Metadata */}
            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">

              <div className="rounded-xl border border-[#2D3D32] bg-[#132319] p-4">
                <p className="text-xs text-[#68746B]">
                  Cooking time
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {recipe.cooking_time} min
                </p>
              </div>

              <div className="rounded-xl border border-[#2D3D32] bg-[#132319] p-4">
                <p className="text-xs text-[#68746B]">
                  Servings
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {recipe.servings}
                </p>
              </div>

              <div className="rounded-xl border border-[#2D3D32] bg-[#132319] p-4">
                <p className="text-xs text-[#68746B]">
                  Cuisine
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {recipe.cuisine}
                </p>
              </div>

              <div className="rounded-xl border border-[#2D3D32] bg-[#132319] p-4">
                <p className="text-xs text-[#68746B]">
                  Diet
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {recipe.diet}
                </p>
              </div>

            </div>

            {/* Divider */}
            <div className="my-8 border-t border-[#2D3D32]" />

            {/* Ingredients */}
            <section>

              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C86B38]">
                  What you need
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Ingredients
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {recipe.ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center justify-between rounded-xl border border-[#2D3D32] bg-[#132319] px-4 py-3.5 transition hover:border-[#C86B38]/40"
                  >
                    <span className="text-sm text-[#C5C9BE]">
                      {ingredient.name}
                    </span>

                    <span className="text-sm font-medium text-[#E8A06F]">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </div>
                ))}

              </div>

            </section>

            {/* Instructions */}
            <section className="mt-10">

              <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C86B38]">
                  Step by step
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Instructions
                </h2>
              </div>

              <div className="space-y-5">

                {recipe.instructions.map((step) => (
                  <div
                    key={step.id}
                    className="flex gap-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C86B38] text-sm font-semibold text-white">
                      {step.step_number}
                    </div>

                    <div className="rounded-xl border border-[#2D3D32] bg-[#132319] px-5 py-4">
                      <p className="text-sm leading-6 text-[#C5C9BE]">
                        {step.instruction}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

            </section>

            {/* Nutrition */}
            {recipe.nutrition && (
              <section className="mt-10">

                <div className="mb-5">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#C86B38]">
                    Per serving
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Nutrition
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                  <div className="rounded-xl border border-[#2D3D32] bg-[#132319] p-5 text-center">
                    <p className="text-xs text-[#68746B]">
                      Calories
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      {recipe.nutrition.calories}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#2D3D32] bg-[#132319] p-5 text-center">
                    <p className="text-xs text-[#68746B]">
                      Protein
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      {recipe.nutrition.protein}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#2D3D32] bg-[#132319] p-5 text-center">
                    <p className="text-xs text-[#68746B]">
                      Carbs
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      {recipe.nutrition.carbohydrates}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#2D3D32] bg-[#132319] p-5 text-center">
                    <p className="text-xs text-[#68746B]">
                      Fat
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      {recipe.nutrition.fat}
                    </p>
                  </div>

                </div>

              </section>
            )}

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-3 border-t border-[#2D3D32] pt-6">

              <button
                type="button"
                className="rounded-xl bg-[#C86B38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9824A]"
              >
                ✏️ Edit Recipe
              </button>

              <button
                type="button"
                className="rounded-xl border border-[#2D3D32] bg-[#132319] px-5 py-3 text-sm text-[#C5C9BE] transition hover:border-[#C86B38] hover:text-[#E8A06F]"
              >
                ↗ Share
              </button>

              <button
                type="button"
                className="rounded-xl border border-red-900/40 bg-red-950/10 px-5 py-3 text-sm text-red-300 transition hover:bg-red-950/30"
              >
                🗑 Delete
              </button>

            </div>

          </div>
        </article>

      </div>
    </section>
  );
};

export default RecipeDetailsContainer;