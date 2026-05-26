import argon2 from "argon2";
import { OTP_EXPIRY_TIME } from "@/lib/constants-types";
import { RegisterFormData } from "./register-schema";
import { doctors, labs, patients, tempUsers, users } from "@/drizzle/schema";
import { db } from "@/config/drizzle/db";
import { generateUserId } from "@/features/server/utils";

export const storeUserInTemp = async (data: RegisterFormData) => {
  try {
    const { confirmPassword, password, ...userData } = data;

    const hashPasword = await argon2.hash(data.password);

    const expiresAt = new Date(Date.now() + OTP_EXPIRY_TIME);

    const [{ id }] = await db
      .insert(tempUsers)
      .values({ ...userData, password: hashPasword, expiresAt })
      .$returningId();
    return id;
  } catch (error) {
    console.log(error);
  }
};

type DataType = {
  name: string;
  number: string;
  email: string;
  gender: "male" | "female" | "other";
  role: "lab" | "patient" | "doctor";
  password: string;
};
export const storeUser = async (data: DataType) => {
  try {
    const userId = await generateUserId(data.role, data.name, db);
    const res = await db.insert(users).values({ userId, ...data });

    if (data.role === "lab") {
      await db.insert(labs).values({ labId: userId });
    } else if (data.role === "patient") {
      await db.insert(patients).values({ patientId: userId });
    } else {
      await db.insert(doctors).values({ doctorId: userId });
    }
  } catch (error) {
    console.log(error);
  }
};
