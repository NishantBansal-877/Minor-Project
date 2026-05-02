"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgotOtpVerify } from "@/features/auth/forgot-password/forgot-password-action";
import { setPasswordStep } from "@/lib/store/slices/auth-slice";

export default function ForgotPasswordOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = useSelector((state: any) => state.auth.email);
  const router = useRouter();
  const dispatch = useDispatch();

  const passwordStep = useSelector((state: any) => state.auth.passwordStep);

  if (passwordStep < 2) {
    return router.push("/login");
  }

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const otpCode = otp.join("");
      console.log(email);
      const res = await forgotOtpVerify(otpCode, email);
      if (res.status === "SUCCESS") {
        toast.success(res.message);
        dispatch(setPasswordStep("3"));
        return router.push("/forgot-password/create-new-password");
      } else {
        return toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl">
            {/* Title */}
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold mb-1">
                Verify your account
              </h2>
              <p className="text-gray-400 text-sm">
                Enter the 6-digit code sent to your phone
              </p>
            </div>

            {/* OTP */}
            <div className="flex justify-between gap-2 mb-6 caret-transparent">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 text-center text-lg rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ))}
            </div>

            {/* Verify */}
            <button
              onClick={handleVerify}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-medium hover:opacity-90"
            >
              Verify OTP
            </button>

            {/* Resend */}
            {/* <p className="text-sm text-gray-400 text-center mt-4">
              Didn’t receive the code?
              <button className="text-emerald-400 hover:underline">
                Resend
              </button>
            </p> */}

            {/* Back */}
            <div className="text-center mt-4">
              <Link
                href="/login"
                className="text-gray-500 text-sm hover:text-white"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
