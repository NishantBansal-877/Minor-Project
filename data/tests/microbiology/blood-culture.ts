import { BasePanelTest } from "@/lib/constants-types";

export interface UrineCultureTest extends BasePanelTest {}

export interface UrineCulturePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: UrineCultureTest[];
}

export const URINE_CULTURE_PANEL: UrineCulturePanel = {
  panelKey: "urine_culture",
  title: "Urine Culture & Sensitivity (UCS)",
  clinicalCategory: "Microbiology",
  specimenType: "Midstream Clean Catch Urine",

  tests: [
    {
      key: "culture_result",
      name: "Culture Result",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No bacterial growth after incubation",
          max: "No bacterial growth after incubation",
        },
        female: {
          min: "No bacterial growth after incubation",
          max: "No bacterial growth after incubation",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Urine Sample",
      required: true,
      desc: "Detection of bacterial growth in urine sample after incubation.",
    },

    {
      key: "organism_identified",
      name: "Organism Identified",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No organism detected",
          max: "No organism detected",
        },
        female: {
          min: "No organism detected",
          max: "No organism detected",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Laboratory Identification",
      required: false,
      nullable: true,
      desc: "Specifies the exact pathogen isolated (e.g., E. coli, Klebsiella).",
    },

    {
      key: "colony_count",
      name: "Colony Forming Units (CFU/mL)",
      unit: "CFU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: "< 10^3",
          max: "≥ 10^5",
        },
        female: {
          min: "< 10^3",
          max: "≥ 10^5",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Quantitative Culture",
      required: true,
      desc: "Bacterial load in urine sample.",
    },

    {
      key: "gram_stain",
      name: "Gram Stain Result",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No bacteria seen",
          max: "Gram positive / Gram negative bacteria seen",
        },
        female: {
          min: "No bacteria seen",
          max: "Gram positive / Gram negative bacteria seen",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Microscopy",
      required: true,
      desc: "Preliminary bacterial classification.",
    },

    {
      key: "pus_cells",
      name: "Pus Cells",
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
      clinicalCategory: "Urinalysis",
      specimenType: "Microscopy",
      required: true,
      desc: "Indicator of urinary tract infection.",
    },

    {
      key: "epithelial_cells",
      name: "Epithelial Cells",
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
      clinicalCategory: "Urinalysis",
      specimenType: "Microscopy",
      required: false,
      desc: "May indicate sample contamination.",
    },

    {
      key: "nitrite_test",
      name: "Nitrite Test",
      unit: null,
      dataType: "boolean",
      referenceRange: {
        male: {
          min: "No nitrites detected",
          max: "Nitrites present",
        },
        female: {
          min: "No nitrites detected",
          max: "Nitrites present",
        },
      },
      clinicalCategory: "Urinalysis",
      specimenType: "Chemical Analysis",
      required: false,
      desc: "Suggests gram-negative bacterial infection.",
    },

    {
      key: "leukocyte_esterase",
      name: "Leukocyte Esterase",
      unit: null,
      dataType: "boolean",
      referenceRange: {
        male: {
          min: "No leukocyte esterase",
          max: "Presence of WBC activity",
        },
        female: {
          min: "No leukocyte esterase",
          max: "Presence of WBC activity",
        },
      },
      clinicalCategory: "Urinalysis",
      specimenType: "Chemical Analysis",
      required: false,
      desc: "Marker of inflammation or infection.",
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
      desc: "Antibiotic susceptibility pattern.",
    },

    {
      key: "time_to_growth",
      name: "Time to Culture Positivity",
      unit: "hours",
      dataType: "float",
      referenceRange: {
        male: {
          min: "24",
          max: "72",
        },
        female: {
          min: "24",
          max: "72",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Lab Process",
      required: false,
      desc: "Time required for bacterial growth detection.",
    },
  ],
};
