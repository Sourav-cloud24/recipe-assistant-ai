import { errorResponse, successResponse } from "../../utils/response.js";
import { getProfiles } from "./profile.service.js";

export const getProfileController = async(req, res) => {
    try {
        const user_id = req.user?.userId

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const profile = await getProfiles(user_id)

        return successResponse(res, {
            statusCode: 200,
            message: "Profile fetched successfully",
            data: profile,
        });
    } catch (error) {
        console.error("GET PROFILE ERROR:", error);

        return errorResponse(res, {
            statusCode: 404,
            message: error.message,
        });
    }
}