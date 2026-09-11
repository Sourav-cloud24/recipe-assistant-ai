import { getShoppingList, updateShoppingListStatusService } from "./shopping-list.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const getShoppingListController = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const { date } = req.query;

    let selectedDate;

    // 1. If no date is provided, use today's date
    if (!date) {
      selectedDate = new Date();
    } else {
      selectedDate = new Date(`${date}T00:00:00`);

      // Validate date
      if (Number.isNaN(selectedDate.getTime())) {
        return errorResponse(res, {
          statusCode: 400,
          message: "Invalid date",
        });
      }
    }

    // 2. Find which day it is
    const day = selectedDate.getDay();

    // Monday = start of week
    const daysFromMonday = day === 0 ? 6 : day - 1;

    // 3. Calculate Monday
    const monday = new Date(selectedDate);

    monday.setDate(selectedDate.getDate() - daysFromMonday);

    // 4. Calculate Sunday
    const sunday = new Date(monday);

    sunday.setDate(monday.getDate() + 6);

    // Convert to YYYY-MM-DD
    const start_date = monday.toISOString().split("T")[0];

    const end_date = sunday.toISOString().split("T")[0];

    // 5. Get shopping list
    const shoppingList = await getShoppingList(user_id, start_date, end_date);

    // 6. Send response
    return successResponse(res, {
      statusCode: 200,
      message: "Shopping list fetched successfully",
      data: {
        start_date,
        end_date,
        items: shoppingList,
      },
    });
  } catch (error) {
    console.error("GET SHOPPING LIST ERROR:", error);

    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const updateShoppingListStatusController = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { id } = req.params;
    const { status } = req.body;

    // Validate ID
    if (!id || !/^\d+$/.test(id)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid shopping list item ID",
      });
    }
    
    // Validate status
    if (!["PENDING", "PURCHASED"].includes(status)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Status must be either PENDING or PURCHASED",
      });
    }

    const item = await updateShoppingListStatusService({
      id,
      user_id,
      status,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Shopping list item status updated successfully",
      data: item,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};
