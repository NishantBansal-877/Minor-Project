import { BasePanelTest } from "@/lib/constants-types";

export interface OccultBloodTest extends BasePanelTest {}

export interface OccultBloodPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: OccultBloodTest[];
}

export const OCCULT_BLOOD_PANEL: OccultBloodPanel = {
  panelKey: "occult_blood",
  title: "Occult Blood Test (FOBT/FIT)",
  clinicalCategory: "Gastroenterology / Hematology",
  specimenType: "Stool Sample",

  tests: [
    {
      key: "fecal_occult_blood_test",
      name: "Fecal Occult Blood Test (FOBT)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No hidden blood detected",
          max: "No hidden blood detected",
        },
        female: {
          min: "No hidden blood detected",
          max: "No hidden blood detected",
        },
      },
      clinicalCategory: "Gastroenterology",
      specimenType: "Stool",
      required: true,
      nullable: false,
      desc: "Detects hidden blood in stool using chemical reaction",
    },

    {
      key: "fecal_immunochemical_test",
      name: "Fecal Immunochemical Test (FIT)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Not detected",
          max: "Not detected",
        },
        female: {
          min: "Not detected",
          max: "Not detected",
        },
      },
      clinicalCategory: "Gastroenterology",
      specimenType: "Stool",
      required: true,
      nullable: false,
      desc: "More specific test for human blood in stool",
    },

    {
      key: "quantitative_hemoglobin",
      name: "Stool Hemoglobin Level",
      unit: "µg Hb/g stool",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 10,
        },
        female: {
          min: 0,
          max: 10,
        },
      },
      clinicalCategory: "Gastroenterology",
      specimenType: "Stool",
      required: false,
      nullable: true,
      desc: "Measures amount of blood in stool",
    },

    {
      key: "repeat_test_recommendation",
      name: "Repeat Test Recommendation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No repeat needed",
          max: "No repeat needed",
        },
        female: {
          min: "No repeat needed",
          max: "No repeat needed",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Follow-up guidance based on result",
    },
  ],
};
