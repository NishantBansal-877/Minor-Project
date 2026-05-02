import { BasePanelTest } from "@/lib/constants-types";

export interface PSATest extends BasePanelTest {}

export interface PSAPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: PSATest[];
}

export const PSA_PANEL: PSAPanel = {
  panelKey: "psa",
  title: "Prostate Specific Antigen (PSA) Panel",
  clinicalCategory: "Oncology / Urology",
  specimenType: "Serum",

  tests: [
    {
      key: "total_psa",
      name: "Total PSA",
      unit: "ng/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 4.0,
        },
        female: {
          min: 0,
          max: 0,
        },
      },
      clinicalCategory: "Urology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Primary screening marker for prostate health",
    },

    {
      key: "free_psa",
      name: "Free PSA",
      unit: "ng/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.1,
          max: 0.5,
        },
        female: {
          min: 0,
          max: 0,
        },
      },
      clinicalCategory: "Urology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Unbound fraction of PSA in blood",
    },

    {
      key: "free_total_psa_ratio",
      name: "Free/Total PSA Ratio",
      unit: "ratio",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.25,
          max: 1,
        },
        female: {
          min: 0,
          max: 0,
        },
      },
      clinicalCategory: "Urology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Helps differentiate benign prostatic disease from malignancy",
    },

    {
      key: "psa_velocity",
      name: "PSA Velocity",
      unit: "ng/mL/year",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 0.75,
        },
        female: {
          min: 0,
          max: 0,
        },
      },
      clinicalCategory: "Urology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Rate of PSA increase over time",
    },

    {
      key: "psa_density",
      name: "PSA Density",
      unit: "ng/mL/cc",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 0.15,
        },
        female: {
          min: 0,
          max: 0,
        },
      },
      clinicalCategory: "Urology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "PSA level adjusted for prostate volume",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal prostate marker level",
          max: "Normal prostate marker level",
        },
        female: {
          min: "Not applicable",
          max: "Not applicable",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall interpretation of PSA results in clinical context",
    },
  ],
};
