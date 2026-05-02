import { BasePanelTest } from "@/lib/constants-types";

export interface HBsAgTest extends BasePanelTest {}

export interface HBsAgPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: HBsAgTest[];
}

export const HBSAG_PANEL: HBsAgPanel = {
  panelKey: "hbsag",
  title: "Hepatitis B Surface Antigen (HBsAg) Panel",
  clinicalCategory: "Infectious Diseases / Hepatology",
  specimenType: "Serum / Plasma",

  tests: [
    {
      key: "hbsag_screening",
      name: "HBsAg Screening Test",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Non-reactive",
          max: "Non-reactive",
        },
        female: {
          min: "Non-reactive",
          max: "Non-reactive",
        },
      },
      clinicalCategory: "Virology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Primary screening test for Hepatitis B infection",
    },

    {
      key: "hbsag_quantitative",
      name: "HBsAg Quantitative Level",
      unit: "IU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 0.05,
        },
        female: {
          min: 0,
          max: 0.05,
        },
      },
      clinicalCategory: "Virology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Measures viral antigen load",
    },

    {
      key: "hbeag",
      name: "HBeAg (Hepatitis B e Antigen)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Not detected",
          max: "Not detected",
        },
        female: {
          min: "Not detected",
          max: "Not detected",
        },
      },
      clinicalCategory: "Virology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Marker of active viral replication",
    },

    {
      key: "anti_hbe",
      name: "Anti-HBe Antibody",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Detected",
          max: "Detected",
        },
        female: {
          min: "Detected",
          max: "Detected",
        },
      },
      clinicalCategory: "Immunology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Indicates reduced viral replication phase",
    },

    {
      key: "hbv_dna",
      name: "HBV DNA (Viral Load PCR)",
      unit: "IU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 100,
        },
        female: {
          min: 0,
          max: 100,
        },
      },
      clinicalCategory: "Molecular Diagnostics",
      specimenType: "Plasma",
      required: false,
      nullable: true,
      desc: "Measures active viral replication level",
    },

    {
      key: "anti_hbs",
      name: "Anti-HBs Antibody",
      unit: "mIU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 10,
          max: 1000,
        },
        female: {
          min: 10,
          max: 1000,
        },
      },
      clinicalCategory: "Immunology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Indicates immunity to Hepatitis B",
    },
  ],
};
