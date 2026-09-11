import { createMealPlan, deleteMealPlan, getMealPlansByUser } from "./meal-planner.repository.js"


export const addMealPlan = async (mealPlanData) => {
    const mealPlan = await createMealPlan(mealPlanData)
    // console.log("mealPlan-->", mealPlan)

    return mealPlan
}

export const getUserMealPlan = async (user_id, start_date, end_date) => {
//    console.log("SERVICE user_id:", user_id);
// console.log("SERVICE start_date:", start_date);
// console.log("SERVICE end_date:", end_date);
    const mealPlans = await getMealPlansByUser(user_id, start_date, end_date)
    //  console.log("SERVICE mealPlans:", mealPlans);

    return mealPlans
}

export const deleteUserMealPlan = async(id, user_id) => {
    const mealPlan = await deleteMealPlan(id, user_id)
    // console.log("mealPlan service :", mealPlan);

    if (!mealPlan) {
        throw new Error("Meal plan not found");
    }

    return mealPlan 
}