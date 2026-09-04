import { errorResponse, successResponse } from "../../utils/response.js";
import { getDashboardData } from "./dashboard.service.js"


export const getDashboard = async (req, res) => {
    try {
        const user_id = req.user?.userId

        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Get selected week from query parameter
        const { week_start_date } = req.query;

        // console.log("week_start_date-->", week_start_date)

        const dashboardData = await getDashboardData(user_id, week_start_date)

        // console.log("dashboardData controller-->", dashboardData)

        return successResponse(res, {
            success: true,
            message: "Dashboard data fetched successfully",
            data: dashboardData,
        });

    } catch (error) {
        return errorResponse(res, {
            statusCode: 500,
            message: error.message,
        });
    }
}