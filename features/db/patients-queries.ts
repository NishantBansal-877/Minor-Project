"use server";
import { db } from "@/config/drizzle/db";
import { labPatients, reports, users } from "@/drizzle/schema";
import { or, like, eq, and } from "drizzle-orm";

export const searchRegisteredPatients = async (
  query: string,
  labId: string,
) => {
  if (!query) {
    return [];
  }

  const result = await db
    .select({
      userId: users.userId,
      name: users.name,
      number: users.number,
      gender: users.gender,
    })
    .from(labPatients)
    .innerJoin(users, eq(users.userId, labPatients.patientId))
    .where(eq(labPatients.labId, labId))
    .limit(20);

  return result;
};
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
      and(
        or(
          like(users.name, `%${query}%`),
          like(users.number, `%${query}%`),
          like(users.userId, `%${query}%`),
        ),
        eq(users.role, "patient"),
      ),
    )
    .limit(20);
};

export const getPatientsReportAction = async (patientId: string) => {
  const result = await db
    .select({
      id: reports.id,
      title: reports.panelKey,
      date: reports.createdAt,
      status: reports.status,
    })
    .from(users)
    .innerJoin(labPatients, eq(labPatients.patientId, users.userId))
    .innerJoin(reports, eq(reports.patientId, users.userId))
    .where(eq(users.userId, patientId));
  return result;
};
