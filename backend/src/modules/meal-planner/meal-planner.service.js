import { createMealPlan, getMealPlansByUser } from "./meal-planner.repository.js"


export const addMealPlan = async (mealPlanData) => {
    const mealPlan = await createMealPlan(mealPlanData)

    return mealPlan
}

export const getUserMealPlan = async (user_id) => {
    const mealPlans = await getMealPlansByUser(user_id)

    return mealPlans
}