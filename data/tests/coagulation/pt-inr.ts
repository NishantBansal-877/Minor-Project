import { BasePanelTest } from "@/lib/constants-types";

export interface PTINRTest extends BasePanelTest {}

export interface PTINRPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: PTINRTest[];
}

export const PT_INR_PANEL: PTINRPanel = {
  panelKey: "pt_inr",
  title: "Prothrombin Time (PT) / INR Panel",
  clinicalCategory: "Hematology / Coagulation",
  specimenType: "Citrated Plasma",

  tests: [
    {
      key: "prothrombin_time",
      name: "Prothrombin Time (PT)",
      unit: "seconds",
      dataType: "float",
      referenceRange: {
        male: {
          min: 11,
          max: 13.5,
        },
        female: {
          min: 11,
          max: 13.5,
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Citrated Plasma",
      required: true,
      nullable: false,
      desc: "Measures extrinsic coagulation pathway",
    },

    {
      key: "inr",
      name: "International Normalized Ratio (INR)",
      unit: "ratio",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.8,
          max: 1.2,
        },
        female: {
          min: 0.8,
          max: 1.2,
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Citrated Plasma",
      required: true,
      nullable: false,
      desc: "Standardized PT value for monitoring warfarin therapy",
    },

    {
      key: "pt_control",
      name: "PT Control",
      unit: "seconds",
      dataType: "float",
      referenceRange: {
        male: {
          min: 11,
          max: 13.5,
        },
        female: {
          min: 11,
          max: 13.5,
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Citrated Plasma",
      required: false,
      nullable: true,
      desc: "Laboratory control reference value",
    },

    {
      key: "pt_ratio",
      name: "PT Ratio",
      unit: "ratio",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.9,
          max: 1.2,
        },
        female: {
          min: 0.9,
          max: 1.2,
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Patient PT compared to control PT",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal coagulation",
          max: "Normal coagulation",
        },
        female: {
          min: "Normal coagulation",
          max: "Normal coagulation",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall clotting status assessment",
    },
  ],
};
