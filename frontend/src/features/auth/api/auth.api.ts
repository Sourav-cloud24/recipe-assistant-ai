import apiClient from "@/services/apiClient";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/auth.types";

export const authApi = {
  register: async (data: RegisterRequest) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },
};