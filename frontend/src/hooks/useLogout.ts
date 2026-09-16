"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    // 1. Remove authentication token
    localStorage.removeItem("token");

    // 2. Clear cached user-specific data
    queryClient.clear();

    // 3. Redirect to login
    router.replace("/");

    // 4. Show message
    toast.success("Logged out successfully");
  };

  return logout;
};