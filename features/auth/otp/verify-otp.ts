"use server";
import { db } from "@/config/drizzle/db";
import { otps, tempUsers, users } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { storeUser } from "../register/register-queries";

export const verifyOtp = async (otp: string, email: string) => {
  try {
    // if (req.user) {
    //   return { status: "ERROR", message: "Your are already loggged in" };
    // }
    const [{ tempUserId }] = await db
      .select()
      .from(otps)
      .where(and(eq(otps.email, email), eq(otps.otp, otp)));

    if (!tempUserId) {
      return { status: "ERROR", message: "Invalid otp, please try again" };
    }

    const [data] = await db
      .select()
      .from(tempUsers)
      .where(and(eq(tempUsers.email, email), eq(tempUsers.id, tempUserId)));

    const { expiresAt, ...userData } = data;

    await storeUser(userData);

    return { status: "SUCCESS", message: "User is registered successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};
