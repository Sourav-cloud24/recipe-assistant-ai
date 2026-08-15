"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  AddMealPlanForm,
  addMealPlanSchema,
} from "../schema/meal-plan-dialog-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useCreateMealPlan } from "../hooks/useCreateMealPlan";

interface Recipe {
  id: number;
  title: string;
  cooking_time: number;
}

interface DialogDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMealDate: string;
  selectedMealType: string;
  recipes: Recipe[];
}

export function DialogDemo({
  open,
  onOpenChange,
  selectedMealDate,
  selectedMealType,
  recipes,
}: DialogDemoProps) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMealPlanForm>({
    resolver: zodResolver(addMealPlanSchema),
  });

  const createMealPlan = useCreateMealPlan()

  console.log("selectedMealDate-->", selectedMealDate)
  console.log("selectedMealType-->", selectedMealType)

  useEffect(() => {
  if (!open) return;

  const formattedDate = selectedMealDate
    ? selectedMealDate.split("-").reverse().join("-")
    : "";

  const formattedMealType = selectedMealType
    ? selectedMealType.toUpperCase()
    : "";

  reset({
    meal_date: formattedDate,
    meal_type: formattedMealType as AddMealPlanForm["meal_type"],
    recipe_id: 0,
    // servings: 2,
    notes: "",
  });
}, [open, selectedMealDate, selectedMealType, reset]);

  const handleFormSubmit = (data: AddMealPlanForm) => {
    const formattedData = {
      ...data,
      meal_type: data.meal_type.toUpperCase()
      // date: (data.date),
    };
    createMealPlan.mutate(formattedData)

    console.log("MEAL PLAN DATA -->", formattedData);

    // Later:
    // addMealPlan.mutate(mealData)

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          border-[#344238]
          bg-[#101C14]
          text-[#F4F1E8]
          sm:max-w-lg
        "
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-semibold text-[#F4F1E8]">
              Add Meal
            </DialogTitle>

            <DialogDescription className="text-sm text-[#A8A99A]">
              Add a recipe to your meal planner and keep your week organized.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* Date + Meal Type */}
            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm text-[#C5C9BE]">
                  Date
                </Label>

                <Input
                  id="date"
                  type="date"
                  {...register("meal_date")}
                  className="
                    border-[#344238]
                    bg-[#18251C]
                    text-[#F4F1E8]
                    scheme-dark
                    focus:border-[#C86B38]
                  "
                />

                {errors.meal_date && (
                  <p className="text-xs text-red-400">{errors.meal_date.message}</p>
                )}
              </div>

              {/* Meal Type */}
              <div className="space-y-2">
                <Label htmlFor="mealType" className="text-sm text-[#C5C9BE]">
                  Meal
                </Label>

                <select
                  id="meal_type"
                  {...register("meal_type")}
                  required
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-[#344238]
                    bg-[#18251C]
                    px-3
                    text-sm
                    text-[#F4F1E8]
                    outline-none
                    focus:border-[#C86B38]
                  "
                >
                  <option value="" disabled>
                    Select meal
                  </option>

                  <option value="BREAKFAST">☀️ Breakfast</option>

                  <option value="LUNCH">☀️ Lunch</option>

                  <option value="DINNER">🌙 Dinner</option>

                  <option value="SNACK">☕ Snack</option>
                </select>
              </div>
            </div>

            {/* Recipe */}
            <div className="space-y-2">
              <Label htmlFor="recipeId" className="text-sm text-[#C5C9BE]">
                Recipe
              </Label>

              <select
                id="recipe_id"
                {...register("recipe_id", { valueAsNumber: true })}
                required
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-[#344238]
                  bg-[#18251C]
                  px-3
                  text-sm
                  text-[#F4F1E8]
                  outline-none
                  focus:border-[#C86B38]
                "
              >
                <option value="" disabled>
                  Select a recipe
                </option>

                {recipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.title} • {recipe.cooking_time} min
                  </option>
                ))}
              </select>

              <p className="text-xs text-[#68746B]">
                Choose from your saved recipes.
              </p>
            </div>

            {/* Servings */}
            {/* <div className="space-y-2">
              <Label htmlFor="servings" className="text-sm text-[#C5C9BE]">
                Servings
              </Label>

              <Input
                id="servings"
                type="number"
                {...register("servings", { valueAsNumber: true })}
                className="
                  border-[#344238]
                  bg-[#18251C]
                  text-[#F4F1E8]
                  placeholder:text-[#68746B]
                  focus:border-[#C86B38]
                  focus:ring-[#C86B38]
                "
              />
            </div> */}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm text-[#C5C9BE]">
                Notes
                <span className="ml-1 text-xs text-[#68746B]">(optional)</span>
              </Label>

              <textarea
                id="notes"
                {...register("notes")}
                name="notes"
                rows={3}
                placeholder="e.g. Prepare less spicy..."
                className="
                  w-full
                  resize-none
                  rounded-md
                  border
                  border-[#344238]
                  bg-[#18251C]
                  px-3
                  py-2
                  text-sm
                  text-[#F4F1E8]
                  placeholder:text-[#68746B]
                  outline-none
                  focus:border-[#C86B38]
                  focus:ring-1
                  focus:ring-[#C86B38]
                "
              />
            </div>

            {/* Small preview */}
            <div
              className="
                rounded-xl
                border
                border-[#344238]
                bg-[#18251C]
                p-4
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#C86B38]/15
                    text-lg
                  "
                >
                  ✨
                </div>

                <div>
                  <p className="text-sm font-medium text-[#F4F1E8]">
                    Plan your meal
                  </p>

                  <p className="text-xs text-[#A8A99A]">
                    Keep your weekly meals organized and balanced.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="mt-7 gap-2">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="
                    border-[#344238]
                    bg-[#18251C]
                    text-[#C5C9BE]
                    hover:border-[#C86B38]
                    hover:bg-[#C86B38]/10
                    hover:text-white
                  "
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              className="
                bg-[#C86B38]
                px-5
                text-white
                hover:bg-[#D9824A]
              "
            >
              + Add Meal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
