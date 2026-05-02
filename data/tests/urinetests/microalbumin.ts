import { BasePanelTest } from "@/lib/constants-types";

export interface MicroalbuminTest extends BasePanelTest {}

export interface MicroalbuminPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: MicroalbuminTest[];
}

export const MICROALBUMIN_PANEL: MicroalbuminPanel = {
  panelKey: "microalbumin",
  title: "Microalbuminuria (Early Kidney Damage Panel)",
  clinicalCategory: "Nephrology / Endocrinology",
  specimenType: "Urine (Spot / 24-hour)",

  tests: [
    {
      key: "urine_microalbumin",
      name: "Urine Microalbumin",
      unit: "mg/L",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 30,
        },
        female: {
          min: 0,
          max: 30,
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Early marker of kidney damage, especially in diabetes and hypertension",
    },

    {
      key: "albumin_creatinine_ratio",
      name: "Albumin/Creatinine Ratio (ACR)",
      unit: "mg/g",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 30,
        },
        female: {
          min: 0,
          max: 30,
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Preferred test for detecting early diabetic nephropathy",
    },

    {
      key: "urine_creatinine",
      name: "Urine Creatinine",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 20,
          max: 320,
        },
        female: {
          min: 20,
          max: 320,
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Urine",
      required: false,
      nullable: true,
      desc: "Used to normalize urinary albumin excretion",
    },

    {
      key: "protein_excretion_rate",
      name: "Albumin Excretion Rate",
      unit: "µg/min",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 20,
        },
        female: {
          min: 0,
          max: 20,
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "24-hour Urine",
      required: false,
      nullable: true,
      desc: "Measures total albumin loss over time",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No albumin leakage detected",
          max: "No albumin leakage detected",
        },
        female: {
          min: "No albumin leakage detected",
          max: "No albumin leakage detected",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall interpretation of renal microvascular injury",
    },
  ],
};
