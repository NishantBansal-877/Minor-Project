import { BasePanelTest } from "@/lib/constants-types";

export interface HCGTest extends BasePanelTest {}

export interface HCGPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: HCGTest[];
}

export const HCG_PANEL: HCGPanel = {
  panelKey: "hcg_pregnancy_test",
  title: "Pregnancy Test (hCG - Human Chorionic Gonadotropin)",
  clinicalCategory: "Endocrinology / Obstetrics",
  specimenType: "Urine / Serum",

  tests: [
    {
      key: "urine_hcg_qualitative",
      name: "Urine hCG (Qualitative)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Not detected",
          max: "Not detected",
        },
        female: {
          min: "Not detected",
          max: "Detected",
        },
      },
      clinicalCategory: "Obstetrics",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Basic screening test for pregnancy detection in urine",
    },

    {
      key: "serum_hcg_qualitative",
      name: "Serum hCG (Qualitative)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Non-reactive",
          max: "Non-reactive",
        },
        female: {
          min: "Non-reactive",
          max: "Reactive",
        },
      },
      clinicalCategory: "Obstetrics",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "More sensitive serum-based pregnancy detection test",
    },

    {
      key: "beta_hcg_quantitative",
      name: "Beta-hCG (Quantitative)",
      unit: "mIU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 5,
        },
        female: {
          min: 0,
          max: 25,
        },
      },
      clinicalCategory: "Obstetrics",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Exact measurement of hCG hormone level in blood",
    },

    {
      key: "beta_hcg_doubling_time",
      name: "Beta-hCG Doubling Time",
      unit: "hours",
      dataType: "float",
      referenceRange: {
        male: {
          min: 48,
          max: 72,
        },
        female: {
          min: 48,
          max: 72,
        },
      },
      clinicalCategory: "Obstetrics",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Used to assess early pregnancy viability and progression",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No pregnancy detected",
          max: "No pregnancy detected",
        },
        female: {
          min: "No pregnancy detected",
          max: "Pregnancy likely present",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall interpretation of hCG results in clinical context",
    },
  ],
};
