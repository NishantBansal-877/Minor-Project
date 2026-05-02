import { sendEmail } from "./nodemailer";
import crypto from "crypto";
import { otps } from "@/drizzle/schema";
import { db } from "@/config/drizzle/db";

export const sendOtp = async (
  email: string,
  name: string,
  tempUserId?: number,
) => {
  try {
    const otp = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await db.insert(otps).values({ email, tempUserId, otp, expiresAt });
    await sendEmail(email, name, otp);
  } catch (error) {
    console.log(error);
  }
};
