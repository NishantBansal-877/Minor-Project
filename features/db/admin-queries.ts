"use server";

import { db } from "@/config/drizzle/db";
import { labPatients, patients, reports, users } from "@/drizzle/schema";
import { count, eq } from "drizzle-orm";
import { ca } from "zod/v4/locales";

type PanelDetailType = {
  clinicalCategory?: string;
  panelKey: string;
  panelTitle: string;
  specimenType?: string;
  values: Record<string, string | undefined>;
}[];

export const savePanelDetails = async (
  panelDetails: PanelDetailType,
  labId: string,
  patientId: string,
) => {
  try {
    for (let i = 0; i < panelDetails.length; i++) {
      const { panelTitle, panelKey, specimenType, clinicalCategory, values } =
        panelDetails[i];
      await db.insert(reports).values({
        labId,
        panelKey,
        panelTitle,
        patientId,
        specimenType,
        clinicalCategory,
        values,
      });
    }

    await db
      .insert(labPatients)
      .values({ patientId, labId })
      .onDuplicateKeyUpdate({
        set: {
          patientId,
          labId,
        },
      });

    return { status: "SUCCESS", message: "Reports added successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, pleasse try again",
    };
  }
};

export const getPatientDetail = async (labId: string) => {
  try {
    const rows = await db
      .select()
      .from(labPatients)
      .innerJoin(users, eq(users.userId, labPatients.patientId))
      .innerJoin(reports, eq(reports.patientId, users.userId))
      .where(eq(labPatients.labId, labId));

    console.log(rows);
    const grouped = Object.values(
      rows.reduce(
        (acc, row) => {
          const user = row.users;
          const report = row.reports;

          if (!acc[user.userId]) {
            acc[user.userId] = {
              id: user.userId,
              name: user.name,
              patientId: user.userId,
              visits: [],
            };
          }

          acc[user.userId].visits.push({
            id: report.id,
            date: report.createdAt,
            test: report.panelKey,
            status: report.status,
          });

          return acc;
        },
        {} as Record<string, any>,
      ),
    );
    return grouped;
  } catch (error) {
    console.log(error);
  }
};

export const getReportDetail = async (reportId: number) => {
  try {
    const [res] = await db
      .select()
      .from(reports)
      .where(eq(reports.id, reportId));
    return res;
  } catch (error) {
    console.log(error);
  }
};
type FormValues = Record<string, string | undefined>;

export const updateReport = async (reportId: string, values: FormValues) => {
  try {
    await db
      .update(reports)
      .set({ values })
      .where(eq(reports.id, Number(reportId)));
    return { status: "SUCCESS", message: "Updated the report successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};

export const deleteReport = async (reportId: string) => {
  try {
    await db.delete(reports).where(eq(reports.id, Number(reportId)));

    return { status: "SUCCESSFUL", message: "Report deleted successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};

export const getLabData = async (labId: string) => {
  try {
    const result = await db.transaction(async (tx) => {
      const labData = await tx
        .select({
          name: users.name,
          role: users.role,
        })
        .from(users)
        .where(eq(users.userId, labId));

      const [reportNumbers] = await tx
        .select({
          reports: count(),
        })
        .from(reports)
        .where(eq(reports.labId, labId));

      const [patientNumbers] = await tx
        .select({
          patients: count(),
        })
        .from(labPatients)
        .where(eq(labPatients.labId, labId));

      return {
        labData,
        reports: reportNumbers.reports,
        patients: patientNumbers.patients,
      };
    });

    const { labData, reports: totalReports, patients } = result;
  } catch (error) {}
};

export const getLabDataAction = async (labId: string) => {
  try {
    const [result] = await db
      .select({ name: users.name, email: users.email })
      .from(users)
      .where(eq(users.userId, labId));

    const [reportNumbers] = await db
      .select({ reports: count() })
      .from(reports)
      .where(eq(reports.labId, labId));

    const [patientNumbers] = await db
      .select({ patients: count() })
      .from(labPatients)
      .where(eq(labPatients.labId, labId));

    return {
      adminData: result,
      statsData: {
        reports: reportNumbers.reports,
        patients: patientNumbers.patients,
      },
    };
  } catch (error) {
    console.log(error);
    return { adminData: null, statsData: { reports: 0, patients: 0 } };
  }
};
