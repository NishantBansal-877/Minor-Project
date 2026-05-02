import { BasePanelTest } from "@/lib/constants-types";

export interface UrineProteinTest extends BasePanelTest {}

export interface UrineProteinPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: UrineProteinTest[];
}

export const URINE_PROTEIN_PANEL: UrineProteinPanel = {
  panelKey: "urine_protein",
  title: "Urine Protein Analysis (Proteinuria Evaluation)",
  clinicalCategory: "Nephrology / Clinical Pathology",
  specimenType: "Urine (Random / 24-hour collection)",

  tests: [
    {
      key: "urine_protein_qualitative",
      name: "Urine Protein (Qualitative)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Trace",
        },
        female: {
          min: "Absent",
          max: "Trace",
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Screening test for presence of protein in urine",
    },

    {
      key: "urine_protein_quantitative",
      name: "Urine Protein (Quantitative)",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 15,
        },
        female: {
          min: 0,
          max: 15,
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Measured concentration of protein in urine sample",
    },

    {
      key: "24hr_urine_protein",
      name: "24-Hour Urine Protein",
      unit: "mg/day",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 150,
        },
        female: {
          min: 0,
          max: 150,
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "24-hour Urine",
      required: false,
      nullable: true,
      desc: "Gold standard measurement of daily protein loss",
    },

    {
      key: "protein_creatinine_ratio",
      name: "Urine Protein/Creatinine Ratio",
      unit: "ratio",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 0.2,
        },
        female: {
          min: 0,
          max: 0.2,
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Urine",
      required: false,
      nullable: true,
      desc: "Alternative to 24-hour urine protein measurement",
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
      required: false,
      nullable: true,
      desc: "Early marker of diabetic kidney damage",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant proteinuria detected",
          max: "No significant proteinuria detected",
        },
        female: {
          min: "No significant proteinuria detected",
          max: "No significant proteinuria detected",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall interpretation of proteinuria severity and significance",
    },
  ],
};
