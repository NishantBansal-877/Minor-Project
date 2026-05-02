import { BasePanelTest } from "@/lib/constants-types";

export interface CRPTest extends BasePanelTest {}

export interface CRPPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: CRPTest[];
}

export const CRP_PANEL: CRPPanel = {
  panelKey: "crp",
  title: "C-Reactive Protein (CRP) Panel",
  clinicalCategory: "Inflammation / Immunology",
  specimenType: "Serum",

  tests: [
    {
      key: "crp",
      name: "C-Reactive Protein (CRP)",
      unit: "mg/L",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 5,
        },
        female: {
          min: 0,
          max: 5,
        },
      },
      clinicalCategory: "Inflammation",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "General marker of acute inflammation or infection",
    },

    {
      key: "hs_crp",
      name: "High-Sensitivity CRP (hs-CRP)",
      unit: "mg/L",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 1,
        },
        female: {
          min: 0,
          max: 1,
        },
      },
      clinicalCategory: "Cardiovascular Risk",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Used for cardiovascular disease risk assessment",
    },

    {
      key: "crp_trend",
      name: "CRP Trend",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Improving inflammation",
          max: "Improving inflammation",
        },
        female: {
          min: "Improving inflammation",
          max: "Improving inflammation",
        },
      },
      clinicalCategory: "Inflammation Monitoring",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Trend analysis over repeated measurements",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant inflammation",
          max: "No significant inflammation",
        },
        female: {
          min: "No significant inflammation",
          max: "No significant inflammation",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall clinical meaning of CRP level",
    },
  ],
};
