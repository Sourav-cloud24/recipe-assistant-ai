import apiClient from "@/services/apiClient"
import { DashboardResponse } from "../types/overview.type"


export const overviewApi = {
    getDashboard: async(week_start_date?: string): Promise<DashboardResponse> => {
        const response = await apiClient.get<DashboardResponse>("/overview", {
            params: week_start_date ? {week_start_date}: undefined
        })

        return response.data
    }
}