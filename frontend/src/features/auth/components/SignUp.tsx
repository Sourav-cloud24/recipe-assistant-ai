"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData,
} from "../schemas/register.schema";

// type RegisterFormData = {
//   fullname: string;
//   email: string;
//   password: string;
// };
const SignUp = () => {
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),
  mode: "onBlur",
});

  const router = useRouter();

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: authApi.register,

    onSuccess: (response) => {
      toast.success(response.message);
      reset();
      router.push("/login");
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900 p-8 border-r border-dashed">
      <div className="w-xl shadow-lg rounded-md bg-white p-8 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Full name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full name
            </label>

            <input
              type="text"
              disabled={isPending}
              placeholder="Enter your full name"
              {...register("fullname")}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-500"
            />

            {errors.fullname && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullname.message}
              </p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              disabled={isPending}
              placeholder="Enter your email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-500"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              disabled={isPending}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-500"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-70"
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
