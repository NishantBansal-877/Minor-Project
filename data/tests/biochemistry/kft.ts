import { BasePanelTest } from "@/lib/constants-types";

export interface KFTTest extends BasePanelTest {}

export interface KFTPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: KFTTest[];
}

export const KFT_PANEL: KFTPanel = {
  panelKey: "kft_full",

  title: "Kidney Function Test (Comprehensive)",

  clinicalCategory: "Nephrology",

  specimenType: "Serum",

  tests: [
    {
      key: "urea",
      name: "Blood Urea",
      desc: "Measures nitrogen waste in blood from protein metabolism",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 15, max: 40 },
        female: { min: 15, max: 40 },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "bun",
      name: "Blood Urea Nitrogen (BUN)",
      desc: "Measures nitrogen in blood derived from urea",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 7, max: 20 },
        female: { min: 7, max: 20 },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "creatinine",
      name: "Serum Creatinine",
      desc: "Waste product from muscle metabolism used to assess kidney function",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 0.6, max: 1.3 },
        female: { min: 0.5, max: 1.1 },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "egfr",
      name: "Estimated GFR",
      desc: "Estimates kidney filtration efficiency",
      unit: "mL/min/1.73m²",
      dataType: "float",
      referenceRange: {
        male: { min: 90, max: 120 },
        female: { min: 90, max: 120 },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Calculated",
      required: true,
      nullable: false,
    },

    {
      key: "sodium",
      name: "Sodium",
      desc: "Electrolyte important for fluid balance and nerve function",
      unit: "mmol/L",
      dataType: "float",
      referenceRange: {
        male: { min: 135, max: 145 },
        female: { min: 135, max: 145 },
      },
      clinicalCategory: "Electrolytes",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "potassium",
      name: "Potassium",
      desc: "Essential electrolyte for heart and muscle function",
      unit: "mmol/L",
      dataType: "float",
      referenceRange: {
        male: { min: 3.5, max: 5.0 },
        female: { min: 3.5, max: 5.0 },
      },
      clinicalCategory: "Electrolytes",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "chloride",
      name: "Chloride",
      desc: "Maintains acid-base balance and fluid regulation",
      unit: "mmol/L",
      dataType: "float",
      referenceRange: {
        male: { min: 98, max: 107 },
        female: { min: 98, max: 107 },
      },
      clinicalCategory: "Electrolytes",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "bicarbonate",
      name: "Bicarbonate",
      desc: "Helps maintain body’s acid-base (pH) balance",
      unit: "mmol/L",
      dataType: "float",
      referenceRange: {
        male: { min: 22, max: 28 },
        female: { min: 22, max: 28 },
      },
      clinicalCategory: "Acid-Base",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "calcium",
      name: "Calcium",
      desc: "Important for bones, muscles, and nerve signaling",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 8.5, max: 10.5 },
        female: { min: 8.5, max: 10.5 },
      },
      clinicalCategory: "Minerals",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "phosphorus",
      name: "Phosphorus",
      desc: "Works with calcium for bone strength and energy metabolism",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 2.5, max: 4.5 },
        female: { min: 2.5, max: 4.5 },
      },
      clinicalCategory: "Minerals",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "magnesium",
      name: "Magnesium",
      desc: "Supports muscle, nerve, and enzyme function",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 1.7, max: 2.2 },
        female: { min: 1.7, max: 2.2 },
      },
      clinicalCategory: "Minerals",
      specimenType: "Serum",
      required: false,
      nullable: true,
    },

    {
      key: "uric_acid",
      name: "Uric Acid",
      desc: "Waste product from purine metabolism, linked to gout risk",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 3.5, max: 7.2 },
        female: { min: 2.6, max: 6.0 },
      },
      clinicalCategory: "Metabolic",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "total_protein",
      name: "Total Protein",
      desc: "Measures total albumin and globulin in blood",
      unit: "g/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 6.0, max: 8.3 },
        female: { min: 6.0, max: 8.3 },
      },
      clinicalCategory: "Protein",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "albumin",
      name: "Albumin",
      desc: "Main protein produced by liver, maintains oncotic pressure",
      unit: "g/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 3.5, max: 5.0 },
        female: { min: 3.5, max: 5.0 },
      },
      clinicalCategory: "Protein",
      specimenType: "Serum",
      required: true,
      nullable: false,
    },

    {
      key: "urine_protein",
      name: "Urine Protein",
      desc: "Detects protein leakage in urine indicating kidney damage",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 150 },
        female: { min: 0, max: 150 },
      },
      clinicalCategory: "Urine",
      specimenType: "Urine",
      required: false,
      nullable: true,
    },

    {
      key: "protein_creatinine_ratio",
      name: "Protein/Creatinine Ratio",
      desc: "Estimates protein loss in urine",
      unit: "ratio",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 0.2 },
        female: { min: 0, max: 0.2 },
      },
      clinicalCategory: "Urine",
      specimenType: "Urine",
      required: false,
      nullable: true,
    },

    {
      key: "cystatin_c",
      name: "Cystatin C",
      desc: "Sensitive marker for early kidney dysfunction",
      unit: "mg/L",
      dataType: "float",
      referenceRange: {
        male: { min: 0.6, max: 1.2 },
        female: { min: 0.6, max: 1.2 },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Serum",
      required: false,
      nullable: true,
    },

    {
      key: "anion_gap",
      name: "Anion Gap",
      desc: "Measures acid-base balance in blood",
      unit: "mmol/L",
      dataType: "float",
      referenceRange: {
        male: { min: 8, max: 16 },
        female: { min: 8, max: 16 },
      },
      clinicalCategory: "Acid-Base",
      specimenType: "Calculated",
      required: false,
      nullable: true,
    },
  ],
};
