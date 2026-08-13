import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import "./config/db.js"
import authRoutes from "./modules/auth/auth.routes.js"
import pantryRoutes from "./modules/pantry/pantry.routes.js"
import aiRoutes from "./modules/ai/ai.routes.js"
import recipeRoutes from "./modules/recipe/recipe.routes.js"
import mealPlanRoutes from "./modules/meal-planner/meal-planner.routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/pantry", pantryRoutes)
app.use("/api/v1/ai", aiRoutes)
app.use("/api/v1/recipes", recipeRoutes)
app.use("/api/v1/meal-plan", mealPlanRoutes)

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Recipe Assistant is running"
    })
})

export default app