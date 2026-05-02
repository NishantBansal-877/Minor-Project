"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { forgotPassword } from "@/features/auth/forgot-password/forgot-password-action";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addEmail, setPasswordStep } from "@/lib/store/slices/auth-slice";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Enter a valid email");
      return;
    }

    const res = await forgotPassword(email);

    if (res.status === "SUCCESS") {
      toast.success(res.message);
      dispatch(addEmail(email));
      dispatch(setPasswordStep("2"));
      return router.push("/forgot-password/otp");
    } else {
      return toast.error(res.message);
    }
  };

  return (
    <div className="flex-2 bg-[#020617] text-white flex flex-col">
      {/* Main */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Forgot Password</h2>
              <p className="text-gray-400 text-sm">
                Enter your email to receive OTP
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-2 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-medium hover:opacity-90"
              >
                Send OTP
              </button>
            </div>

            {/* Back */}
            <div className="mt-4 text-center">
              <Link
                href="/login"
                className="text-sm text-gray-400 hover:text-white"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
