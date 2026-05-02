import { BasePanelTest } from "@/lib/constants-types";

export interface SputumCultureTest extends BasePanelTest {}

export interface SputumCulturePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: SputumCultureTest[];
}

export const SPUTUM_CULTURE_PANEL: SputumCulturePanel = {
  panelKey: "sputum_culture",
  title: "Sputum Culture & Sensitivity (SC/S)",
  clinicalCategory: "Microbiology / Pulmonology",
  specimenType: "Early Morning Deep Cough Sputum",

  tests: [
    {
      key: "culture_result",
      name: "Culture Result",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No pathogenic growth after incubation",
          max: "No pathogenic growth after incubation",
        },
        female: {
          min: "No pathogenic growth after incubation",
          max: "No pathogenic growth after incubation",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Sputum Sample",
      required: true,
      nullable: false,
      desc: "Detection of bacterial or fungal growth in sputum sample.",
    },

    {
      key: "organism_identified",
      name: "Organism Identified",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No pathogen detected",
          max: "No pathogen detected",
        },
        female: {
          min: "No pathogen detected",
          max: "No pathogen detected",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Laboratory Identification",
      required: false,
      nullable: true,
      desc: "Specific organism identified if culture is positive.",
    },

    {
      key: "gram_stain_result",
      name: "Gram Stain Result",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal respiratory flora",
          max: "Gram positive / Gram negative organisms seen",
        },
        female: {
          min: "Normal respiratory flora",
          max: "Gram positive / Gram negative organisms seen",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Microscopy",
      required: true,
      nullable: false,
      desc: "Preliminary bacterial classification of sputum sample.",
    },

    {
      key: "afb_stain",
      name: "Acid Fast Bacilli (AFB) Stain",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No AFB seen",
          max: "AFB detected",
        },
        female: {
          min: "No AFB seen",
          max: "AFB detected",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Microscopy",
      required: false,
      nullable: true,
      desc: "Screening test for Mycobacterium tuberculosis.",
    },

    {
      key: "pus_cells",
      name: "Pus Cells",
      unit: "cells/HPF",
      dataType: "float",
      referenceRange: {
        male: {
          min: "0",
          max: "10",
        },
        female: {
          min: "0",
          max: "10",
        },
      },
      clinicalCategory: "Microscopy",
      specimenType: "Microscopy",
      required: true,
      nullable: false,
      desc: "Indicates presence of infection or inflammation.",
    },

    {
      key: "epithelial_cells",
      name: "Squamous Epithelial Cells",
      unit: "cells/HPF",
      dataType: "float",
      referenceRange: {
        male: {
          min: "0",
          max: "5",
        },
        female: {
          min: "0",
          max: "5",
        },
      },
      clinicalCategory: "Specimen Quality",
      specimenType: "Microscopy",
      required: false,
      nullable: true,
      desc: "Indicates sample contamination level.",
    },

    {
      key: "culture_quantification",
      name: "Colony Count (CFU/mL)",
      unit: "CFU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: "10^4",
          max: "10^5",
        },
        female: {
          min: "10^4",
          max: "10^5",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Quantitative Culture",
      required: true,
      nullable: false,
      desc: "Estimation of bacterial load in sputum sample.",
    },

    {
      key: "antibiotic_sensitivity",
      name: "Antibiotic Sensitivity (AST)",
      unit: null,
      dataType: "object",
      referenceRange: {
        male: {
          min: "S / I / R",
          max: "S / I / R",
        },
        female: {
          min: "S / I / R",
          max: "S / I / R",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Isolated Organism",
      required: false,
      nullable: true,
      desc: "Antibiotic response pattern of isolated organism.",
    },

    {
      key: "time_to_growth",
      name: "Time to Culture Positivity",
      unit: "hours",
      dataType: "float",
      referenceRange: {
        male: {
          min: "24",
          max: "120",
        },
        female: {
          min: "24",
          max: "120",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Lab Process",
      required: false,
      nullable: true,
      desc: "Time taken for organism growth detection.",
    },
  ],
};
