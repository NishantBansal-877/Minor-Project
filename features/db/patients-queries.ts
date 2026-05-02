"use server";
import { db } from "@/config/drizzle/db";
import { users } from "@/drizzle/schema";
import { or, like } from "drizzle-orm";

export const searchPatients = async (query: string) => {
  if (!query) {
    return [];
  }

  return await db
    .select({
      userId: users.userId,
      name: users.name,
      number: users.number,
      gender: users.gender,
    })
    .from(users)
    .where(
      or(
        like(users.name, `%${query}%`),
        like(users.number, `%${query}%`),
        like(users.userId, `%${query}%`),
      ),
    )
    .limit(20);
};
