"use client";

import Link from "next/link";
import { PhoneInput } from "@/components/auth/phone-input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/features/auth/login/login-schema";
import { toast } from "sonner";
import { loginUserAction } from "@/features/auth/login/login-actions";
import { useDispatch } from "react-redux";
import { addUserData } from "@/lib/store/slices/user-slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUserAction(data);
      const formattedUser = {
        ...result.data,
        address: result.data?.address ?? "",
        details: result.data?.details ?? "",
        isVerified: result.data?.isVerified ?? false,

        createdAt: result.data?.createdAt
          ? result.data.createdAt.toISOString()
          : "",

        expiresAt: result.data?.expiresAt
          ? result.data.expiresAt.toISOString()
          : "",
      };

      dispatch(addUserData(formattedUser));
      if (result.status === "SUCCESS") {
        toast.success(result.message);

        if (result.data?.role === "patient") {
          return router.push("/dashboard");
        } else {
          return router.push("/admin/dashboard");
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-2 flex justify-center items-center"
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-xl text-white font-semibold mb-1">
                Welcome back
              </h2>
              <p className="text-gray-400 text-sm">Sign in to get started</p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Email *
                </label>

                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Password *
                </label>

                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot */}
              <div className="text-right -mt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-medium hover:opacity-90"
              >
                Sign In
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-6"></div>

            {/* Footer */}
            <p className="text-sm text-gray-400 text-center">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-emerald-400 font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
