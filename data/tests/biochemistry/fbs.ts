import { BasePanelTest } from "@/lib/constants-types";

export interface FBSPanelTest extends BasePanelTest {}

export interface FBSPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: FBSPanelTest[];
}

export const FBS_PANEL: FBSPanel = {
  panelKey: "fbs",

  title: "Fasting Blood Sugar (FBS)",

  clinicalCategory: "Biochemistry / Endocrinology",

  specimenType: "Venous Blood (Fasting Plasma)",

  tests: [
    {
      key: "fbs",

      name: "Fasting Blood Glucose",

      desc: "Blood glucose level after 8–12 hours of fasting",

      unit: "mg/dL",

      dataType: "float",

      referenceRange: {
        male: {
          min: 70,
          max: 99,
        },

        female: {
          min: 70,
          max: 99,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Plasma",

      required: true,

      nullable: false,
    },

    {
      key: "glucose_method",

      name: "Measurement Method",

      desc: "Laboratory method used for glucose estimation",

      unit: null,

      dataType: "string",

      referenceRange: {
        male: {
          min: "Glucose oxidase / Hexokinase method",
          max: "Glucose oxidase / Hexokinase method",
        },

        female: {
          min: "Glucose oxidase / Hexokinase method",
          max: "Glucose oxidase / Hexokinase method",
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Plasma",

      required: true,

      nullable: false,
    },

    {
      key: "fasting_duration",

      name: "Fasting Duration",

      desc: "Duration of fasting before sample collection",

      unit: "hours",

      dataType: "float",

      referenceRange: {
        male: {
          min: 8,
          max: 12,
        },

        female: {
          min: 8,
          max: 12,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Patient Condition",

      required: true,

      nullable: false,
    },

    {
      key: "interpretation",

      name: "Clinical Interpretation",

      desc: "Diagnostic interpretation of fasting glucose level",

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
