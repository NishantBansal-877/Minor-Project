import { BasePanelTest } from "@/lib/constants-types";

export interface CA125Test extends BasePanelTest {}

export interface CA125Panel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: CA125Test[];
}

export const CA125_PANEL: CA125Panel = {
  panelKey: "ca_125",
  title: "Cancer Antigen 125 (CA-125) Panel",
  clinicalCategory: "Oncology / Gynecology",
  specimenType: "Serum",

  tests: [
    {
      key: "ca125",
      name: "CA-125 (Cancer Antigen 125)",
      unit: "U/mL",
      dataType: "float",
      referenceRange: {
        female: {
          min: 0,
          max: 35,
        },
      },
      clinicalCategory: "Oncology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Primary tumor marker for ovarian cancer monitoring",
    },

    {
      key: "ca125_trend",
      name: "CA-125 Trend",
      unit: null,
      dataType: "string",
      referenceRange: {
        female: {
          min: "Treatment response / improvement",
          max: "Possible disease progression",
        },
      },
      clinicalCategory: "Oncology Monitoring",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Serial trend of CA-125 levels for disease monitoring",
    },

    {
      key: "benign_causes_indicator",
      name: "Benign Elevation Indicator",
      unit: null,
      dataType: "string",
      referenceRange: {
        female: {
          min: "No benign cause suspected",
          max: "Possible endometriosis, menstruation, pregnancy, or PID",
        },
      },
      clinicalCategory: "Gynecology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Non-malignant causes of CA-125 elevation",
    },

    {
      key: "ovarian_cancer_risk",
      name: "Ovarian Cancer Risk Indicator",
      unit: null,
      dataType: "string",
      referenceRange: {
        female: {
          min: "Low risk",
          max: "High suspicion of ovarian malignancy",
        },
      },
      clinicalCategory: "Oncology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Risk estimation based on CA-125 level and context",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        female: {
          min: "No significant tumor marker elevation",
          max: "Possible ovarian malignancy—further evaluation required",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall interpretation of CA-125 results",
    },
  ],
};
