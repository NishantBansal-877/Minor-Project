import { BasePanelTest } from "@/lib/constants-types";

export interface CortisolTest extends BasePanelTest {}

export interface CortisolPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: CortisolTest[];
}

export const CORTISOL_PANEL: CortisolPanel = {
  panelKey: "cortisol",
  title: "Cortisol (Stress Hormone) Panel",
  clinicalCategory: "Endocrinology / Adrenal Function",
  specimenType: "Serum / Saliva / Urine",

  tests: [
    {
      key: "serum_cortisol_morning",
      name: "Serum Cortisol (Morning - 8 AM)",
      unit: "µg/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 6,
          max: 23,
        },
        female: {
          min: 6,
          max: 23,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Peak cortisol level in morning (circadian peak)",
    },

    {
      key: "serum_cortisol_evening",
      name: "Serum Cortisol (Evening - 4 PM)",
      unit: "µg/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 3,
          max: 13,
        },
        female: {
          min: 3,
          max: 13,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Lower cortisol level in evening",
    },
  ],
};
