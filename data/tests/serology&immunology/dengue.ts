import { BasePanelTest } from "@/lib/constants-types";

export interface DengueTest extends BasePanelTest {}

export interface DenguePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: DengueTest[];
}

export const DENGUE_PANEL: DenguePanel = {
  panelKey: "dengue",
  title: "Dengue Fever Diagnostic Panel",
  clinicalCategory: "Infectious Diseases / Virology",
  specimenType: "Serum / Plasma / Blood",

  tests: [
    {
      key: "ns1_antigen",
      name: "Dengue NS1 Antigen",
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
      desc: "Early marker of acute dengue infection (day 1–5)",
    },

    {
      key: "dengue_igm",
      name: "Dengue IgM Antibody",
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
      clinicalCategory: "Immunology",
      specimenType: "Serum",
      required: true,
      nullable: true,
      desc: "Recent or acute dengue infection marker",
    },

    {
      key: "dengue_igg",
      name: "Dengue IgG Antibody",
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
      clinicalCategory: "Immunology",
      specimenType: "Serum",
      required: true,
      nullable: true,
      desc: "Past infection or secondary dengue infection marker",
    },

    {
      key: "platelet_count",
      name: "Platelet Count",
      unit: "cells/µL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 150000,
          max: 450000,
        },
        female: {
          min: 150000,
          max: 450000,
        },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Blood",
      required: true,
      nullable: false,
      desc: "Thrombocytopenia indicator in dengue",
    },

    {
      key: "hematocrit",
      name: "Hematocrit (PCV)",
      unit: "%",
      dataType: "float",
      referenceRange: {
        male: {
          min: 40,
          max: 52,
        },
        female: {
          min: 36,
          max: 48,
        },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Blood",
      required: true,
      nullable: false,
      desc: "Rising levels indicate plasma leakage",
    },

    {
      key: "wbc_count",
      name: "White Blood Cell Count",
      unit: "cells/µL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 4000,
          max: 11000,
        },
        female: {
          min: 4000,
          max: 11000,
        },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Blood",
      required: true,
      nullable: false,
      desc: "Often reduced in dengue infection",
    },

    {
      key: "alt",
      name: "ALT (SGPT)",
      unit: "U/L",
      dataType: "float",
      referenceRange: {
        male: {
          min: 7,
          max: 55,
        },
        female: {
          min: 7,
          max: 45,
        },
      },
      clinicalCategory: "Hepatology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Liver enzyme elevation in dengue",
    },

    {
      key: "ast",
      name: "AST (SGOT)",
      unit: "U/L",
      dataType: "float",
      referenceRange: {
        male: {
          min: 8,
          max: 48,
        },
        female: {
          min: 8,
          max: 43,
        },
      },
      clinicalCategory: "Hepatology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Often higher than ALT in dengue infection",
    },

    {
      key: "plateletcrit",
      name: "Plateletcrit (PCT)",
      unit: "%",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.22,
          max: 0.24,
        },
        female: {
          min: 0.22,
          max: 0.24,
        },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Blood",
      required: false,
      nullable: true,
      desc: "Platelet mass index",
    },
  ],
};
