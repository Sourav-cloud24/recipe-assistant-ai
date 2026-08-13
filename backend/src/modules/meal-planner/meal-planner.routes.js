import express from "express"
import { authenticateUser } from "../../middleware/auth.middleware.js"
import { createMealPlanController, getMealPlansController } from "./meal-planner.controller.js"

const mealPlanRoutes = express.Router()

mealPlanRoutes.post("/", authenticateUser, createMealPlanController)
mealPlanRoutes.get("/", authenticateUser, getMealPlansController)

export default mealPlanRoutes