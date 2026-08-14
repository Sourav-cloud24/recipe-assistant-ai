import {z} from "zod"

export const addMealPlanSchema = z.object({
  date: z.string().min(1, "Please select a date"),

  meal_type: z.enum(["breakfast", "lunch", "dinner", "snack"]),

  recipe_id: z.number().min(1, "Please select a recipe"),

  servings: z
    .number()
    .min(1, "At least 1 serving is required")
    .max(20, "Maximum 20 servings"),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});

export type AddMealPlanForm = z.infer<typeof addMealPlanSchema>;