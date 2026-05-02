"use server";

import { db } from "@/config/drizzle/db";
import { otps, users } from "@/drizzle/schema";
import { sendOtp } from "@/features/email/otp-send";
import { and, eq } from "drizzle-orm";
import argon2 from "argon2";

export const forgotPassword = async (email: string) => {
  try {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!result) {
      return { status: "ERROR", message: "Email is not registered" };
    }

    await sendOtp(email, result.name);

    return {
      status: "SUCCESS",
      message: "OTP send to your email",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};

export const forgotOtpVerify = async (otp: string, email: string) => {
  try {
    const [result] = await db
      .select()
      .from(otps)
      .where(and(eq(otps.email, email), eq(otps.otp, otp)));

    if (!result) {
      return { status: "ERROR", message: "Invalid otp, please try again" };
    }

    return { status: "SUCCESS", message: "Create new password" };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};

type dataType = {
  newPassword: string;
  confirmPassword: string;
};

export const resetPasswordAction = async (data: dataType, email: string) => {
  try {
    if (data.newPassword !== data.confirmPassword) {
      return { status: "ERROR", message: "Passwords do not match" };
    }
    const hashPasword = await argon2.hash(data.newPassword);

    await db.update(users).set({ password: hashPasword });

    return { status: "SUCCESS", message: "Password updated successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};
