import { BasePanelTest } from "@/lib/constants-types";

export interface ESRTest extends BasePanelTest {
  referenceRange: {
    male?: { min: number; max: number };
    female?: { min: number; max: number };
    child?: { min: number; max: number };
    elderly?: { min: number; max: number };
  };
}

export interface ESRPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: ESRTest[];
}

export const ESR_PANEL: ESRPanel = {
  panelKey: "esr",
  title: "Erythrocyte Sedimentation Rate (ESR) ",
  clinicalCategory: "Hematology / Inflammation",
  specimenType: "Whole Blood (EDTA / Citrated)",

  tests: [
    {
      key: "esr",
      name: "ESR (1st Hour)",
      desc: "Rate of erythrocyte sedimentation in 1 hour; marker of inflammation",
      unit: "mm/hr",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 15 },
        female: { min: 0, max: 20 },
        child: { min: 0, max: 10 },
        elderly: { min: 0, max: 30 },
      },
      clinicalCategory: "Hematology",
      specimenType: "Whole Blood",
      required: true,
      nullable: false,
    },

    {
      key: "esr_2nd_hour",
      name: "ESR (2nd Hour)",
      desc: "Extended ESR measurement for trend observation",
      unit: "mm",
      dataType: "float",
      referenceRange: {
        male: { min: 0, max: 20 },
        female: { min: 0, max: 20 },
      },
      clinicalCategory: "Hematology",
      specimenType: "Whole Blood",
      required: false,
      nullable: true,
    },

    {
      key: "hematocrit_adjustment",
      name: "Hematocrit Influence",
      desc: "Effect of hematocrit levels on ESR (anemia increases ESR, polycythemia decreases ESR)",
      unit: "%",
      dataType: "float",
      referenceRange: {
        male: { min: 40, max: 52 },
        female: { min: 36, max: 48 },
      },
      clinicalCategory: "Hematology",
      specimenType: "Whole Blood",
      required: false,
      nullable: true,
    },

    {
      key: "interpretation",
      name: "Clinical Interpretation",
      desc: "Final ESR interpretation based on trend and clinical context",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: { min: 0, max: 0 },
        female: { min: 0, max: 0 },
      },
      clinicalCategory: "Hematology",
      specimenType: "Report Output",
      required: false,
      nullable: true,
    },
  ],
};
