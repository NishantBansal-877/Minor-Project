import { BasePanelTest } from "@/lib/constants-types";

export interface HbA1cTest extends BasePanelTest {}

export interface HbA1cPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: HbA1cTest[];
}

export const HBA1C_PANEL: HbA1cPanel = {
  panelKey: "hba1c",

  title: "Glycated Hemoglobin (HbA1c)",

  clinicalCategory: "Biochemistry / Endocrinology",

  specimenType: "Whole Blood (EDTA)",

  tests: [
    {
      key: "hba1c",

      name: "HbA1c (Glycated Hemoglobin)",

      desc: "Average blood glucose over past 2–3 months",

      unit: "%",

      dataType: "float",

      referenceRange: {
        male: {
          min: 4.0,
          max: 5.6,
        },

        female: {
          min: 4.0,
          max: 5.6,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "EDTA Whole Blood",

      required: true,

      nullable: false,
    },

    {
      key: "estimated_avg_glucose",

      name: "Estimated Average Glucose (eAG)",

      desc: "Calculated average glucose from HbA1c",

      unit: "mg/dL",

      dataType: "float",

      referenceRange: {
        male: {
          min: 70,
          max: 140,
        },

        female: {
          min: 70,
          max: 140,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Calculated Value",

      required: false,

      nullable: true,
    },

    {
      key: "measurement_method",

      name: "Measurement Method",

      desc: "Method used for HbA1c estimation",

      unit: null,

      dataType: "string",

      referenceRange: {
        male: {
          min: "HPLC / Immunoassay / Boronate affinity",
          max: "HPLC / Immunoassay / Boronate affinity",
        },

        female: {
          min: "HPLC / Immunoassay / Boronate affinity",
          max: "HPLC / Immunoassay / Boronate affinity",
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Lab Process",

      required: true,

      nullable: false,
    },

    {
      key: "interpretation",

      name: "Clinical Interpretation",

      desc: "Overall glycemic control interpretation",

      unit: null,

      dataType: "string",

      referenceRange: {
        male: {
          min: "Normal",
          max: "Normal",
        },

        female: {
          min: "Normal",
          max: "Normal",
        },
      },

      clinicalCategory: "Endocrinology",

      specimenType: "Report Output",

      required: false,

      nullable: true,
    },
  ],
};
