import { BasePanelTest } from "@/lib/constants-types";

export interface HIVTest extends BasePanelTest {}

export interface HIVPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: HIVTest[];
}

export const HIV_PANEL: HIVPanel = {
  panelKey: "hiv",
  title: "HIV Screening & Confirmation Panel",
  clinicalCategory: "Infectious Diseases / Immunology",
  specimenType: "Serum / Plasma / Whole Blood",

  tests: [
    {
      key: "hiv_1_2_antibody",
      name: "HIV-1/2 Antibody Test",
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
      clinicalCategory: "Infectious Diseases",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Primary screening test for HIV antibodies",
    },

    {
      key: "hiv_p24_antigen",
      name: "HIV p24 Antigen",
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
      clinicalCategory: "Infectious Diseases",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Early marker of acute HIV infection",
    },

    {
      key: "hiv_combo_test",
      name: "HIV 1/2 Ag/Ab Combo (4th Generation)",
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
      clinicalCategory: "Infectious Diseases",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Combined antigen and antibody screening test",
    },

    {
      key: "hiv_confirmatory_test",
      name: "HIV Confirmatory Test (Western Blot / Immunoblot)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No HIV-specific bands detected",
          max: "No HIV-specific bands detected",
        },
        female: {
          min: "No HIV-specific bands detected",
          max: "No HIV-specific bands detected",
        },
      },
      clinicalCategory: "Infectious Diseases",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Confirmatory diagnostic test after screening positivity",
    },

    {
      key: "hiv_rna_pcr",
      name: "HIV RNA (Viral Load PCR)",
      unit: "copies/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 50,
        },
        female: {
          min: 0,
          max: 50,
        },
      },
      clinicalCategory: "Molecular Diagnostics",
      specimenType: "Plasma",
      required: false,
      nullable: true,
      desc: "Measures active viral replication",
    },

    {
      key: "cd4_count",
      name: "CD4 T-Cell Count",
      unit: "cells/µL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 500,
          max: 1500,
        },
        female: {
          min: 500,
          max: 1500,
        },
      },
      clinicalCategory: "Immunology",
      specimenType: "Whole Blood",
      required: false,
      nullable: true,
      desc: "Immune system status indicator",
    },

    {
      key: "cd4_cd8_ratio",
      name: "CD4/CD8 Ratio",
      unit: "ratio",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.9,
          max: 3.5,
        },
        female: {
          min: 0.9,
          max: 3.5,
        },
      },
      clinicalCategory: "Immunology",
      specimenType: "Whole Blood",
      required: false,
      nullable: true,
      desc: "Immune balance marker",
    },
  ],
};
