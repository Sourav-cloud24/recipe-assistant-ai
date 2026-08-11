"use client";

import { useForm } from "react-hook-form";

interface GenerateRecipeForm {
  ingredients: string[];
  cuisine: string;
  diet: string;
  servings: number;
  maxCookingTime: number;
}

interface RecipeGPTProps {
  pantryItems: {
    id: number;
    ingredient_name: string;
  }[];
  onGenerate: (data: GenerateRecipeForm) => void;
}

const RecipeGPT = ({ pantryItems, onGenerate }: RecipeGPTProps) => {
  const { register, handleSubmit, setValue, watch } =
    useForm<GenerateRecipeForm>({
      defaultValues: {
        ingredients: [],
        cuisine: "Indian",
        diet: "Non-Vegetarian",
        servings: 2,
        maxCookingTime: 30,
      },
    });

  // Watch form values
  const selectedIngredients = watch("ingredients");
  const servings = watch("servings");

  // --------------------------------
  // Ingredient selection
  // --------------------------------

  const toggleSelectItem = (ingredient: string) => {
    const currentIngredients = selectedIngredients || [];

    const exists = currentIngredients.includes(ingredient);

    if (exists) {
      setValue(
        "ingredients",
        currentIngredients.filter((item) => item !== ingredient),
        {
          shouldDirty: true,
        },
      );
    } else {
      setValue("ingredients", [...currentIngredients, ingredient], {
        shouldDirty: true,
      });
    }
  };

  // --------------------------------
  // Custom ingredient
  // --------------------------------

  const handleIngredientKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const input = e.currentTarget;
    const ingredient = input.value.trim();

    if (!ingredient) return;

    const currentIngredients = selectedIngredients || [];

    // Case-insensitive duplicate check
    const exists = currentIngredients.some(
      (item) => item.toLowerCase() === ingredient.toLowerCase(),
    );

    if (exists) {
      input.value = "";
      return;
    }

    setValue("ingredients", [...currentIngredients, ingredient], {
      shouldDirty: true,
    });

    input.value = "";
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const handleRecipeDetails = (data: GenerateRecipeForm) => {
    console.log("RECIPE DATA -->", data);
    onGenerate(data);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#18251C] text-[#F3EEDF]">
      <div className="max-w-125">
        {/* Form */}
        <form onSubmit={handleSubmit(handleRecipeDetails)}>
          {/* Main Card */}
          <div className="rounded-2xl border border-[#344238] bg-[#223027] p-6 shadow-2xl">
            {/* ============================= */}
            {/* Ingredients */}
            {/* ============================= */}

            <div className="mb-7">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium">
                  What ingredients do you have?
                </label>

                <span className="text-xs text-[#A8A99A]">
                  {selectedIngredients.length} selected
                </span>
              </div>

              {/* Ingredient Box */}
              <div className="rounded-xl border border-[#344238] bg-[#18251C] p-4">
                {/* Selected Ingredients */}
                {selectedIngredients.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedIngredients.map((ingredient) => (
                      <div
                        key={ingredient}
                        className="flex items-center gap-2 rounded-full border border-[#C86B38]/40 bg-[#C86B38]/15 px-3 py-1.5 text-sm text-[#E8A06F]"
                      >
                        <span>{ingredient}</span>

                        <button
                          type="button"
                          onClick={() => toggleSelectItem(ingredient)}
                          className="text-[#A8A99A] transition hover:text-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pantry Ingredients */}
                <div className="mb-4">
                  <p className="mb-3 text-xs text-[#68746B]">
                    Select from your pantry
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {pantryItems?.map((item) => {
                      const isSelected = selectedIngredients.includes(
                        item.ingredient_name,
                      );

                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => toggleSelectItem(item.ingredient_name)}
                          className={`rounded-full border px-3 py-1.5 text-xs transition ${
                            isSelected
                              ? "border-[#C86B38] bg-[#C86B38] text-white"
                              : "border-[#344238] bg-[#223027] text-[#C5C9BE] hover:border-[#C86B38] hover:text-[#E8A06F]"
                          }`}
                        >
                          {item.ingredient_name}

                          {isSelected && <span className="ml-1.5">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Ingredient */}
                <div className="border-t border-[#344238] pt-3">
                  <input
                    type="text"
                    placeholder="Add another ingredient and press Enter..."
                    onKeyDown={handleIngredientKeyDown}
                    className="w-full bg-transparent text-sm text-[#F3EEDF] outline-none placeholder:text-[#68746B]"
                  />
                </div>
              </div>
            </div>

            {/* ============================= */}
            {/* Preferences */}
            {/* ============================= */}

            <div className="grid gap-5 md:grid-cols-2">
              {/* Cuisine */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Cuisine
                </label>

                <select
                  {...register("cuisine")}
                  className="w-full rounded-xl border border-[#344238] bg-[#18251C] px-4 py-3 text-sm text-[#F3EEDF] outline-none transition focus:border-[#C86B38]"
                >
                  <option value="Indian">Indian</option>

                  <option value="Italian">Italian</option>

                  <option value="Chinese">Chinese</option>

                  <option value="Mexican">Mexican</option>

                  <option value="Korean">Korean</option>

                  <option value="American">American</option>
                </select>
              </div>

              {/* Diet */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Dietary preference
                </label>

                <select
                  {...register("diet")}
                  className="w-full rounded-xl border border-[#344238] bg-[#18251C] px-4 py-3 text-sm text-[#F3EEDF] outline-none transition focus:border-[#C86B38]"
                >
                  <option value="Non-Vegetarian">Non-Vegetarian</option>

                  <option value="Vegetarian">Vegetarian</option>

                  <option value="Vegan">Vegan</option>

                  <option value="High Protein">High Protein</option>

                  <option value="Low Carb">Low Carb</option>
                </select>
              </div>

              {/* Servings */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Servings
                </label>

                <div className="flex items-center rounded-xl border border-[#344238] bg-[#18251C]">
                  <button
                    type="button"
                    onClick={() =>
                      setValue("servings", Math.max(1, servings - 1), {
                        shouldDirty: true,
                      })
                    }
                    className="px-4 py-3 text-lg text-[#A8A99A] transition hover:text-white"
                  >
                    −
                  </button>

                  <span className="flex-1 text-center text-sm">{servings}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setValue("servings", servings + 1, {
                        shouldDirty: true,
                      })
                    }
                    className="px-4 py-3 text-lg text-[#A8A99A] transition hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Cooking Time */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Maximum cooking time
                </label>

                <select
                  {...register("maxCookingTime", {
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border border-[#344238] bg-[#18251C] px-4 py-3 text-sm text-[#F3EEDF] outline-none transition focus:border-[#C86B38]"
                >
                  <option value={15}>15 minutes</option>

                  <option value={30}>30 minutes</option>

                  <option value={45}>45 minutes</option>

                  <option value={60}>60 minutes</option>

                  <option value={90}>90+ minutes</option>
                </select>
              </div>
            </div>

            {/* ============================= */}
            {/* Quick Ideas */}
            {/* ============================= */}

            <div className="mt-7">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#A8A99A]">
                Quick ideas
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "🍝 Something quick",
                  "🥗 Healthy",
                  "🍛 Indian dinner",
                  "💪 High protein",
                  "🌱 Vegetarian",
                ].map((item) => (
                  <button
                    type="button"
                    key={item}
                    className="rounded-full border border-[#344238] bg-[#18251C] px-4 py-2 text-xs text-[#C5C9BE] transition hover:border-[#C86B38] hover:text-[#E8A06F]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* ============================= */}
            {/* Generate */}
            {/* ============================= */}

            <div className="mt-8 flex flex-col items-center border-t border-[#344238] pt-6">
              <button
                type="submit"
                disabled={selectedIngredients.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C86B38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C86B38]/10 transition hover:bg-[#D9824A] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto md:min-w-[260px]"
              >
                <span>✨</span>
                Generate Recipe
              </button>

              <p className="mt-3 text-xs text-[#68746B]">
                Powered by AI · Personalized for you
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RecipeGPT;
