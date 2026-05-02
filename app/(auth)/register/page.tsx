"use client";

import Link from "next/link";
import { PhoneInput } from "@/components/auth/phone-input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  registerSchema,
} from "@/features/auth/register/register-schema";
import { GENDER } from "@/lib/constants-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { registerUserAction } from "@/features/auth/register/register-actions";
import { useRouter } from "next/navigation";
import { addUserData } from "@/lib/store/slices/user-slice";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "patient",
    },
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerUserAction(data);

      if (result.status === "SUCCESS") {
        dispatch(addUserData({ email: data.email }));
        toast.success(result.message);
        return router.push("/otp");
      } else {
        return toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
      className="flex-2 flex justify-center items-center"
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xl px-4">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1 text-white">
                Create account
              </h2>
              <p className="text-gray-400 text-sm">Register to get started</p>
            </div>

            <div className="space-y-4">
              {/* Name + Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* NAME */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Ashok Kumar"
                    className="input"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Phone Number *
                  </label>

                  <Controller
                    name="number"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  {errors.number && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.number.message}
                    </p>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Email *
                </label>
                <input
                  {...register("email")}
                  placeholder="name@example.com"
                  className="input"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between gap-4">
                {/* GENDER */}
                <div className="w-full">
                  <label className="text-sm text-gray-400 mb-2 block">
                    Gender
                  </label>

                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="input">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>

                        <SelectContent>
                          {GENDER.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g.charAt(0).toUpperCase() + g.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.gender && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* ROLE */}
                <div className="w-full">
                  <label className="text-sm text-gray-400 mb-2 block">
                    Account Type
                  </label>

                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="input">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent>
                          {["patient", "doctor", "lab"].map((r) => (
                            <SelectItem key={r} value={r}>
                              {r.charAt(0).toUpperCase() + r.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.role && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>
              {/* PASSWORDS */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Min. 8 characters"
                    className="input"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Repeat password"
                    className="input"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-medium hover:opacity-90"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-6"></div>

            <p className="text-sm text-gray-400 text-center">
              Already registered?{" "}
              <Link
                href="/login"
                className="text-emerald-400 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
