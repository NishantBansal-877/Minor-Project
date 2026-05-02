"use server";

import { SignJWT } from "jose";
import { eq } from "drizzle-orm";
import { idSequence } from "@/drizzle/schema";
import { cookies } from "next/headers";
import { RoleType } from "@/lib/constants-types";

export const generateUserId = async (
  role: "patient" | "doctor" | "lab",
  name: string,
  db: any,
) => {
  const roleMap = {
    patient: "PID",
    doctor: "DID",
    lab: "LID",
  } as const;

  const type = roleMap[role];

  const formatName = (name: string) =>
    name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 4);

  const getMonthYear = () => {
    const d = new Date();
    return `${String(d.getMonth() + 1).padStart(2, "0")}${d.getFullYear()}`;
  };

  const [row] = await db
    .select()
    .from(idSequence)
    .where(eq(idSequence.type, type))
    .limit(1);

  const nextSeq = (row?.seq ?? 0) + 1;

  if (row) {
    await db
      .update(idSequence)
      .set({ seq: nextSeq })
      .where(eq(idSequence.type, type));
  } else {
    await db.insert(idSequence).values({
      type,
      seq: nextSeq,
    });
  }

  return `${type}-${formatName(name)}-${getMonthYear()}-${String(nextSeq).padStart(4, "0")}`;
};

type DATA = {
  name: string | undefined;
  email: string | undefined;
  role: "lab" | "patient" | "doctor" | undefined;
};

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const setTokens = async (data: DATA, userId: string | undefined) => {
  const cookieStore = await cookies();
  const { name, email, role } = data;

  const refreshToken = await new SignJWT({ userId, name, email, role })
    .setIssuer("lis")
    .setProtectedHeader({ alg: "HS256" })
    .setAudience("users")
    .setExpirationTime("7d")
    .sign(secret);

  const accessToken = await new SignJWT({ userId, role })
    .setIssuer("lis")
    .setProtectedHeader({ alg: "HS256" })
    .setAudience("users")
    .setExpirationTime("1h")
    .sign(secret);

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });
};

type JwtPayload = {
  name?: string;
  userId?: string;
  role?: RoleType;
  email?: string;
};
