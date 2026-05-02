"use server";

import { db } from "@/config/drizzle/db";
import { reports } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type PanelDetailType = {
  clinicalCategory: string;
  labId: string;
  panelKey: string;
  panelTitle: string;
  patientId: string;
  specimenType: string;
  values: Record<string, string | undefined>;
}[];

export const savePanelDetails = async (panelDetails: PanelDetailType) => {
  try {
    for (let i = 0; i < panelDetails.length; i++) {
      const {
        labId,
        patientId,
        panelTitle,
        panelKey,
        specimenType,
        clinicalCategory,
        values,
      } = panelDetails[i];
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
    return await db.select().from(reports).where(eq(reports.labId, labId));
  } catch (error) {
    console.log(error);
  }
};
