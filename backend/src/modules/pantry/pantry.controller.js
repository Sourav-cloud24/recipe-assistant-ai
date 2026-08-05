import { errorResponse, successResponse } from "../../utils/response.js";
import { addPantryItem, deletePantryItemService, getPantryItemByIdService, getUserPantryItems, updatePantryItemService } from "./pantry.service.js";

export const createPantry = async (req, res) => {
    try {
        const pantryItem = await addPantryItem({
            user_id: req.user.userId,
            ...req.body,
        });
        console.log("Created pantry item:", pantryItem);

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

        const {search} = req.query
        const pantryItems = await getUserPantryItems({user_id: req.user.userId, search});

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

export const getPantryItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const pantryItem = await getPantryItemByIdService({ id, user_id: req.user.userId });

        if (!pantryItem) {
            return errorResponse(res, {
                statusCode: 404,
                message: "Pantry item not found"
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Pantry item retrieved successfully",
            data: pantryItem,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: error.message
        });
    }
}

export const updatePantryItem = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            ingredient_name,
            quantity,
            unit,
            category,
            expiry_date,
            is_low_stock,
        } = req.body;

        const updatedPantryItem = await updatePantryItemService({
            id,
            user_id: req.user.userId,
            ingredient_name,
            quantity,
            unit,
            category,
            expiry_date,
            is_low_stock,
        });
        return successResponse(res, {
            statusCode: 200,
            message: "Pantry item updated successfully",
            data: updatedPantryItem,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: error.message
        });
    }
}

export const deletePantryItem = async (req, res) => {
    console.log("DELETE API HIT");
    try {
        const { id } = req.params;
        const deletedPantryItem = await deletePantryItemService({ id, user_id: req.user.userId });

        return successResponse(res, {
            statusCode: 200,
            message: "Pantry item deleted successfully",
            data: deletedPantryItem,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: error.message
        });
    }
}