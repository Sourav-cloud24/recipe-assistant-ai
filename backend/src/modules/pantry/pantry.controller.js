import { errorResponse, successResponse } from "../../utils/response.js";

export const createPantry = async (req, res) => {
    try {
        const pantryItem = await addPantryItem({
            user_id: req.user.userId,
            ...req.body,
        });

        return successResponse(res, {
            statusCode: 201,
            message: "Pantry item created successfully",
            data: pantryItem,
        })
    } catch (error) {
        return errorResponse(res, {
            statusCode: 400,
            message: error.message
        })
    }
}

export const getPantry = async (req, res) => {
    try {
        const pantryItems = await getUserPantryItems(req.user.userId);

        return successResponse(res, {
            statusCode: 200,
            message: "Pantry items retrieved successfully",
            data: pantryItems,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: error.message
        });
    }
}