"use client";

import { useMemo, useState } from "react";
import { useRecipes } from "../hooks/useRecipes"; 
import { useRouter } from "next/navigation";
import { useDeleteRecipe } from "../hooks/useDeleteRecipe";

const MyRecipeContainer = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const {
    data: recipeResponse,
    isLoading,
    isError,
    error,
  } = useRecipes();

  const recipes = recipeResponse?.data ?? [];
  const router = useRouter()
  const deleteRecipehook = useDeleteRecipe();

  // Search + sort
  const filteredRecipes = useMemo(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      return sort === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
  }, [recipes, search, sort]);

  const deleteRecipe = (id:number) => {
    if (!id) return;
    deleteRecipehook.mutate(id)
  }

  if (isLoading) {
    return (
      <section className="min-h-full bg-[#102016] p-6 text-[#F3EEDF]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="h-8 w-40 animate-pulse rounded bg-[#1B2B20]" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-[#1B2B20]" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-[#2D3D32] bg-[#16271C]"
              >
                <div className="h-44 animate-pulse bg-[#1D3023]" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#24372A]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#24372A]" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#24372A]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-full bg-[#102016] p-6 text-[#F3EEDF]">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-6">
            <h2 className="text-lg font-semibold text-red-300">
              Unable to load recipes
            </h2>

            <p className="mt-2 text-sm text-red-200/70">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading your recipes."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-full bg-[#102016] p-6 text-[#F3EEDF]">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#C86B38]">
              AI Recipes
            </p>

            <h1 className="text-3xl font-semibold tracking-tight">
              My Recipes
            </h1>

            <p className="mt-2 text-sm text-[#8E9A90]">
              All your saved AI generated recipes in one place.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-[#C86B38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D9824A]"
          >
            + Generate New Recipe
          </button>
        </div>

        {/* Search + Sort */}
        <div className="mb-7 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#68746B]">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes..."
              className="w-full rounded-xl border border-[#2D3D32] bg-[#16271C] py-3 pl-11 pr-4 text-sm text-[#F3EEDF] outline-none transition placeholder:text-[#68746B] focus:border-[#C86B38]"
            />
          </div>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "newest" | "oldest")
            }
            className="rounded-xl border border-[#2D3D32] bg-[#16271C] px-4 py-3 text-sm text-[#C5C9BE] outline-none focus:border-[#C86B38]"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
          </select>
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-[#344238] bg-[#132319] px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C86B38]/10 text-3xl">
              🍲
            </div>

            <h2 className="text-lg font-semibold">
              No recipes found
            </h2>

            <p className="mt-2 max-w-md text-sm text-[#7F8B81]">
              {search
                ? "Try searching with a different recipe name."
                : "Generate your first AI recipe and save it here."}
            </p>
          </div>
        )}

        {/* Recipe Cards */}
        {filteredRecipes.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <article
                key={recipe.id}
                className="group overflow-hidden rounded-2xl border border-[#2D3D32] bg-[#16271C] transition duration-300 hover:-translate-y-1 hover:border-[#C86B38]/50 hover:shadow-xl hover:shadow-black/20"
              >
                {/* Recipe Image / Visual */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#2A3828] via-[#263A2A] to-[#17261C]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,107,56,0.18),transparent_35%)]" />

                  <span className="relative text-7xl transition duration-300 group-hover:scale-110">
                    🍛
                  </span>

                  {/* AI Badge */}
                  <span className="absolute left-4 top-4 rounded-full border border-[#C86B38]/30 bg-[#102016]/80 px-3 py-1 text-[11px] font-medium text-[#E8A06F] backdrop-blur">
                    ✨ AI Generated
                  </span>
                  <div className="flex gap-2">
                    {/* Bookmark */}
                    <button
                      type="button"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#102016]/80 text-[#C5C9BE] backdrop-blur transition hover:border-[#C86B38] hover:text-[#E8A06F]"
                      aria-label={`Save ${recipe.title}`}
                    >
                      ♡
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRecipe(recipe.id)}
                      disabled={deleteRecipehook.isPending}
                      className="absolute right-12 top-4 flex h-9 w-16 px-3.5 items-center justify-center border border-white/10 bg-[#102016]/80 text-[#C5C9BE] backdrop-blur transition hover:border-[#db1c1c] hover:text-[#db1c1c]"
                      aria-label={`Save ${recipe.title}`}
                    >
                      {deleteRecipehook.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-semibold text-[#F3EEDF]">
                    {recipe.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-[42px] text-sm leading-5 text-[#8E9A90]">
                    {recipe.description}
                  </p>

                  {/* Metadata */}
                  <div className="mt-5 flex items-center gap-4 border-t border-[#2D3D32] pt-4 text-xs text-[#9AA49B]">
                    <span className="flex items-center gap-1.5">
                      ◷
                      {recipe.cooking_time} min
                    </span>

                    <span className="flex items-center gap-1.5">
                      ♧
                      {recipe.servings} servings
                    </span>
                  </div>

                  {/* Diet */}
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`flex items-center gap-1.5 text-xs ${
                        recipe.diet?.toLowerCase().includes("veget")
                          ? "text-[#91B879]"
                          : "text-[#E8A06F]"
                      }`}
                    >
                      <span>◈</span>
                      {recipe.diet}
                    </span>

                    <span className="text-xs text-[#68746B]">
                      {recipe.cuisine}
                    </span>
                  </div>

                  {/* View Recipe */}
                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl border border-[#344238] bg-[#1B2B20] py-2.5 text-sm font-medium text-[#C5C9BE] transition hover:border-[#C86B38] hover:bg-[#C86B38]/10 hover:text-[#E8A06F]"
                    onClick={() => router.push(`/my-recipes/${recipe.id}`)}
                  >
                    View Recipe →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Result count */}
        {filteredRecipes.length > 0 && (
          <p className="mt-6 text-center text-xs text-[#68746B]">
            Showing {filteredRecipes.length}{" "}
            {filteredRecipes.length === 1 ? "recipe" : "recipes"}
          </p>
        )}
      </div>
    </section>
  );
};

export default MyRecipeContainer;
