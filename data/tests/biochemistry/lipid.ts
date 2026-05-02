import { BasePanelTest } from "@/lib/constants-types";

export interface LipidTest extends BasePanelTest {}

export interface LipidPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: LipidTest[];
}

export const LIPID_PANEL: LipidPanel = {
  panelKey: "lipid_profile",
  title: "Lipid Profile (Comprehensive)",
  clinicalCategory: "Cardiology / Metabolic",
  specimenType: "Serum (Fasting preferred)",

  tests: [
    {
      key: "total_cholesterol",
      name: "Total Cholesterol",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 200 },
        female: { min: 0, max: 200 },
      },
      clinicalCategory: "Cardiology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Measures total cholesterol level in blood, including LDL, HDL, and VLDL fractions.",
    },

    {
      key: "ldl",
      name: "LDL Cholesterol",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 100 },
        female: { min: 0, max: 100 },
      },
      clinicalCategory: "Cardiology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Low-density lipoprotein responsible for cholesterol deposition in arteries (bad cholesterol).",
    },

    {
      key: "hdl",
      name: "HDL Cholesterol",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 40, max: 999 },
        female: { min: 50, max: 999 },
      },
      clinicalCategory: "Cardiology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "High-density lipoprotein that helps remove cholesterol from blood vessels (good cholesterol).",
    },

    {
      key: "triglycerides",
      name: "Triglycerides",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 150 },
        female: { min: 0, max: 150 },
      },
      clinicalCategory: "Cardiology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Represents circulating blood fats used for energy storage.",
    },

    {
      key: "vldl",
      name: "VLDL Cholesterol",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 5, max: 40 },
        female: { min: 5, max: 40 },
      },
      clinicalCategory: "Cardiology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Very low-density lipoprotein responsible for triglyceride transport.",
    },

    {
      key: "non_hdl",
      name: "Non-HDL Cholesterol",
      unit: "mg/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 130 },
        female: { min: 0, max: 130 },
      },
      clinicalCategory: "Cardiology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "All atherogenic cholesterol particles (Total cholesterol minus HDL).",
    },

    {
      key: "chol_hdl_ratio",
      name: "Total Cholesterol / HDL Ratio",
      unit: "ratio",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 3.5 },
        female: { min: 0, max: 3.5 },
      },
      clinicalCategory: "Cardiology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Indicator of cardiovascular risk based on cholesterol balance.",
    },
  ],
};
