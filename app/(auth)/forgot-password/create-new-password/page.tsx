"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { resetPasswordAction } from "@/features/auth/forgot-password/forgot-password-action";

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const NewPasswordPage = () => {
  const router = useRouter();
  const email = useSelector((state: any) => state.auth.email);
  const passwordStep = useSelector((state: any) => state.auth.passwordStep);

  if (passwordStep !== "3") {
    return router.push("/login");
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const res = await resetPasswordAction(data, email);

      if (res.status === "SUCCESS") {
        toast.success(res.message);
        return router.push("/login");
      } else {
        return toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    }
  };

  const password = watch("newPassword");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex justify-center items-center"
    >
      <div className="w-full max-w-md px-4">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-xl text-white font-semibold mb-1">
              Set new password
            </h2>
            <p className="text-gray-400 text-sm">
              Enter and confirm your new password
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                New Password *
              </label>

              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter new password"
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Confirm Password *
              </label>

              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-medium hover:opacity-90"
            >
              Update Password
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 my-6"></div>

          <p className="text-sm text-gray-400 text-center">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-emerald-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default NewPasswordPage;
