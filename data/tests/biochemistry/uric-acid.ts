import { BasePanelTest } from "@/lib/constants-types";

export interface UricAcidTest extends BasePanelTest {}

export interface UricAcidPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: UricAcidTest[];
}

export const URIC_ACID_PANEL: UricAcidPanel = {
  panelKey: "uric_acid",
  title: "Serum Uric Acid",
  clinicalCategory: "Metabolic / Nephrology",
  specimenType: "Serum",

  tests: [
    {
      key: "uric_acid",
      name: "Serum Uric Acid",
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
      desc: "Measures uric acid concentration in blood, a key marker of purine metabolism and gout risk.",
    },

    {
      key: "interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        normal: { min: 0, max: 0 },
        high: { min: 0, max: 0 },
        low: { min: 0, max: 0 },
      },
      clinicalCategory: "Metabolic",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Clinical interpretation based on uric acid level (normal, high, or low).",
    },

    {
      key: "risk_association",
      name: "Associated Risk Indicators",
      unit: null,
      dataType: "string",
      referenceRange: {
        normal: { min: 0, max: 0 },
        highRisk: { min: 0, max: 0 },
      },
      clinicalCategory: "Metabolic",
      specimenType: "Clinical Mapping",
      required: false,
      nullable: true,
      desc: "Indicates associated conditions such as gout, kidney stones, or metabolic syndrome.",
    },
  ],
};
