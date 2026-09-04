import { useQuery } from "@tanstack/react-query";
import { overviewApi } from "../api/overview.api"; 

export const useOverview = (date?: string) => {
  return useQuery({
    queryKey: ["overview", date],
    queryFn: () => overviewApi.getDashboard(date),
  });
};
