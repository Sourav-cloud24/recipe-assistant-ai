import { addMealPlan, getUserMealPlan } from "./meal-planner.service.js";

export const createMealPlanController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const mealPlanData = {
      ...req.body,
      user_id: userId,
    };

    const mealPlan = await addMealPlan(mealPlanData);

    return successResponse(res, {
      statusCode: 201,
      message: "Meal added to planner successfully",
      data: mealPlan,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const getMealPlansController = async(req, res) => {
    try {
        const user_id = req.user.userId;

        const mealPlans = await getUserMealPlan(user_id)

        return successResponse(res, {
            statusCode: 200,
            message: "Meal plans fetched successfully",
            data: mealPlans,
        });
  } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: error.message,
        });
    }
}
