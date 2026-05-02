"use server";

import { db } from "@/config/drizzle/db";
import { RegisterFormData, registerSchema } from "./register-schema";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { storeUserInTemp } from "./register-queries";
import { sendOtp } from "@/features/email/otp-send";

export const registerUserAction = async (formData: RegisterFormData) => {
  try {
    const { data, success, error } = registerSchema.safeParse(formData);

    if (!success || !data) {
      return { status: "ERROR", message: error.issues[0].message };
    }

    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));
    if (result) {
      return { status: "ERROR", message: "Email is already registered" };
    }

    if (data.password !== data.confirmPassword) {
      return {
        status: "ERROR",
        message: "Pasword and confirm password do not match",
      };
    }

    const tempId = await storeUserInTemp(data);

    await sendOtp(data.email, data.name, tempId!);

    return {
      status: "SUCCESS",
      message: "Otp sent to your email",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};

// export const sendOtpToNumber = async (number: string, name: string) => {
//   try {
//     const otp = crypto.randomInt(100000, 1000000).toString();
//     console.log(otp);
//     const smsBody = `Your one-time password (OTP) for LIS login is ${otp}. This code is valid for 10 minutes and should not be shared.If this wasn't you, please secure your account.`;
//     // const res = await sendSMS(smsBody, number);
//     // console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
