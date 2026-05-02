import { BasePanelTest } from "@/lib/constants-types";

export interface APTTTest extends BasePanelTest {}

export interface APTTPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: APTTTest[];
}

export const APTT_PANEL: APTTPanel = {
  panelKey: "aptt",
  title: "Activated Partial Thromboplastin Time (APTT) Panel",
  clinicalCategory: "Hematology / Coagulation",
  specimenType: "Citrated Plasma",

  tests: [
    {
      key: "aptt",
      name: "Activated Partial Thromboplastin Time (APTT)",
      unit: "seconds",
      dataType: "float",
      referenceRange: {
        male: {
          min: 25,
          max: 35,
        },
        female: {
          min: 25,
          max: 35,
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Citrated Plasma",
      required: true,
      nullable: false,
      desc: "Measures intrinsic and common coagulation pathways",
    },

    {
      key: "aptt_control",
      name: "APTT Control",
      unit: "seconds",
      dataType: "float",
      referenceRange: {
        male: {
          min: 25,
          max: 35,
        },
        female: {
          min: 25,
          max: 35,
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Citrated Plasma",
      required: false,
      nullable: true,
      desc: "Laboratory reference control value",
    },

    {
      key: "aptt_ratio",
      name: "APTT Ratio",
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
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Patient APTT compared to control",
    },

    {
      key: "heparin_effect",
      name: "Heparin Effect Assessment",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No anticoagulant effect",
          max: "No anticoagulant effect",
        },
        female: {
          min: "No anticoagulant effect",
          max: "No anticoagulant effect",
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Monitors unfractionated heparin therapy",
    },

    {
      key: "clotting_factor_assessment",
      name: "Intrinsic Pathway Factor Status",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal clotting factors",
          max: "Normal clotting factors",
        },
        female: {
          min: "Normal clotting factors",
          max: "Normal clotting factors",
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Suggests clotting factor deficiencies",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal intrinsic coagulation",
          max: "Normal intrinsic coagulation",
        },
        female: {
          min: "Normal intrinsic coagulation",
          max: "Normal intrinsic coagulation",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall coagulation status assessment",
    },
  ],
};
