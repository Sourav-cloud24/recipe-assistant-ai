import express from "express"
import { authenticateUser } from "../../middleware/auth.middleware.js"
import { createMealPlanController, deleteMealPlanController, getMealPlansController } from "./meal-planner.controller.js"

const mealPlanRoutes = express.Router()

mealPlanRoutes.post("/", authenticateUser, createMealPlanController)
mealPlanRoutes.get("/", authenticateUser, getMealPlansController)
mealPlanRoutes.delete("/:id", authenticateUser, deleteMealPlanController)

export default mealPlanRoutes