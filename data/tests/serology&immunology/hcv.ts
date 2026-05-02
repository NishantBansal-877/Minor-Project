import { BasePanelTest } from "@/lib/constants-types";

export interface HCVTest extends BasePanelTest {}

export interface HCVPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: HCVTest[];
}

export const HCV_PANEL: HCVPanel = {
  panelKey: "hcv",
  title: "Hepatitis C Virus (HCV) Panel",
  clinicalCategory: "Infectious Diseases / Hepatology",
  specimenType: "Serum / Plasma",

  tests: [
    {
      key: "hcv_antibody",
      name: "Anti-HCV Antibody",
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
      desc: "Screening test for Hepatitis C infection",
    },

    {
      key: "hcv_rna_pcr",
      name: "HCV RNA (PCR Viral Load)",
      unit: "IU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 15,
        },
        female: {
          min: 0,
          max: 15,
        },
      },
      clinicalCategory: "Molecular Diagnostics",
      specimenType: "Plasma",
      required: true,
      nullable: false,
      desc: "Confirms active HCV infection and viral replication",
    },

    {
      key: "hcv_genotype",
      name: "HCV Genotype",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Genotype 1",
          max: "Genotype 7",
        },
        female: {
          min: "Genotype 1",
          max: "Genotype 7",
        },
      },
      clinicalCategory: "Virology",
      specimenType: "Plasma",
      required: false,
      nullable: true,
      desc: "Used for treatment planning and antiviral selection",
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
      desc: "Liver inflammation marker commonly elevated in HCV",
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
      desc: "Liver injury marker",
    },

    {
      key: "hcv_core_antigen",
      name: "HCV Core Antigen",
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
      desc: "Alternative marker for active HCV infection",
    },
  ],
};
