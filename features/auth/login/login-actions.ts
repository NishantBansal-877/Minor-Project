"use server";

import { db } from "@/config/drizzle/db";
import { LoginFormData } from "./login-schema";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import argon2 from "argon2";
import { setTokens } from "@/features/server/utils";

export const loginUserAction = async (data: LoginFormData) => {
  try {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));
    if (!result || result === null) {
      return { status: "ERROR", message: "Email is not registered" };
    }

    const isPassword = await argon2.verify(result.password, data.password);

    if (!isPassword) {
      return { status: "ERROR", message: "Invalid email or password" };
    }
    const { email, name, role } = result;
    const { password, id, updatedAt, ...userData } = result;
    await setTokens({ email, name, role }, result.userId);
    return {
      status: "SUCCESS",
      message: "User logged in successfully",
      data: userData,
    };
  } catch (error) {
    console.log(error);
    return { status: "ERROR", message: "Something went wrong" };
  }
};
