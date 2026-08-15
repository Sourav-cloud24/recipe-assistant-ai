import { addMealPlan, getUserMealPlan } from "./meal-planner.service.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export const createMealPlanController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const mealPlanData = {
      ...req.body,
      user_id: userId,
    };

    const mealPlan = await addMealPlan(mealPlanData);
    // console.log("mealPlan-->", mealPlan)

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

export const getMealPlansController = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const { date } = req.query;

    let startDate;
    let endDate;

    if (!date) {
      const today = new Date();

      const day = today.getDay();

      const daysFromMonday = day === 0 ? 6 : day - 1;

      const monday = new Date(today);

      monday.setDate(today.getDate() - daysFromMonday);

      const sunday = new Date(monday);

      sunday.setDate(monday.getDate() + 6);

      startDate = monday.toISOString().split("T")[0];
      endDate = sunday.toISOString().split("T")[0];
    } else {
      const selectedDate = new Date(`${date}T00:00:00`);

      if (Number.isNaN(selectedDate.getTime())) {
        return errorResponse(res, {
          statusCode: 400,
          message: "Invalid date",
        });
      }

      const day = selectedDate.getDay();

      const daysFromMonday = day === 0 ? 6 : day - 1;

      const monday = new Date(selectedDate);

      monday.setDate(today.getDate() - daysFromMonday);

      const sunday = new Date(monday);

      sunday.setDate(monday.getDate() + 6);

      startDate = monday.toISOString().split("T")[0];
      endDate = sunday.toISOString().split("T")[0];
    }

    const mealPlans = await getUserMealPlan(user_id, startDate, endDate);
//     console.log("GET MEAL PLAN");
// console.log("user_id:", user_id);
// console.log("startDate:", startDate);
// console.log("endDate:", endDate);

    return successResponse(res, {
      statusCode: 200,
      message: "Meal plans fetched successfully",
      data: {
        start_date: startDate,
        end_date: endDate,
        meal_plans: mealPlans,
      },
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};
