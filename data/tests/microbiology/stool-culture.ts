import { BasePanelTest } from "@/lib/constants-types";

export interface StoolCultureTest extends BasePanelTest {
  referenceRange: string | Record<string, any>;
}

export interface StoolCulturePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: StoolCultureTest[];
}

export const STOOL_CULTURE_PANEL: StoolCulturePanel = {
  panelKey: "stool_culture",
  title: "Stool Culture & Sensitivity (SC/S)",
  clinicalCategory: "Microbiology / Gastroenterology",
  specimenType: "Fresh Stool Sample",

  tests: [
    {
      key: "culture_result",
      name: "Culture Result",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No enteric pathogens isolated / No growth detected / Pathogenic organism detected",
          max: "No enteric pathogens isolated / No growth detected / Pathogenic organism detected",
        },
        female: {
          min: "No enteric pathogens isolated / No growth detected / Pathogenic organism detected",
          max: "No enteric pathogens isolated / No growth detected / Pathogenic organism detected",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Stool Sample",
      required: true,
      nullable: false,
      desc: "Detection of bacterial pathogens in stool",
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
      desc: "Specific organism (e.g., Salmonella, Shigella, E. coli)",
    },

    {
      key: "gram_stain",
      name: "Gram Stain Result",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal intestinal flora",
          max: "Pathogenic bacteria seen",
        },
        female: {
          min: "Normal intestinal flora",
          max: "Pathogenic bacteria seen",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Microscopy",
      required: true,
      nullable: false,
      desc: "Preliminary bacterial classification",
    },

    {
      key: "ova_parasite",
      name: "Ova & Parasite Examination",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No ova or parasites seen",
          max: "Parasites detected",
        },
        female: {
          min: "No ova or parasites seen",
          max: "Parasites detected",
        },
      },
      clinicalCategory: "Parasitology",
      specimenType: "Microscopy",
      required: true,
      nullable: false,
      desc: "Detection of intestinal parasites",
    },

    {
      key: "wbc_in_stool",
      name: "WBC in Stool",
      unit: "cells/HPF",
      dataType: "float",
      referenceRange: {
        male: { min: "0", max: "5" },
        female: { min: "0", max: "5" },
      },
      clinicalCategory: "Microscopy",
      specimenType: "Microscopy",
      required: true,
      nullable: false,
      desc: "Indicator of intestinal inflammation/infection",
    },

    {
      key: "rbc_in_stool",
      name: "RBC in Stool",
      unit: "cells/HPF",
      dataType: "float",
      referenceRange: {
        male: { min: "0", max: "2" },
        female: { min: "0", max: "2" },
      },
      clinicalCategory: "Microscopy",
      specimenType: "Microscopy",
      required: false,
      nullable: true,
      desc: "Indicates gastrointestinal bleeding",
    },

    {
      key: "culture_quantification",
      name: "Colony Count (CFU/g)",
      unit: "CFU/g",
      dataType: "float",
      referenceRange: {
        male: {
          min: "< 10^4",
          max: "≥ 10^5",
        },
        female: {
          min: "< 10^4",
          max: "≥ 10^5",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Quantitative Culture",
      required: true,
      nullable: false,
      desc: "Bacterial load estimation",
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
      desc: "Antibiotic response profile",
    },

    {
      key: "toxin_detection",
      name: "Toxin Detection (if applicable)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No toxins detected",
          max: "Toxins detected",
        },
        female: {
          min: "No toxins detected",
          max: "Toxins detected",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Stool Sample",
      required: false,
      nullable: true,
      desc: "Detection of bacterial toxins (e.g., C. difficile)",
    },

    {
      key: "time_to_growth",
      name: "Time to Culture Positivity",
      unit: "hours",
      dataType: "float",
      referenceRange: {
        male: { min: "24", max: "120" },
        female: { min: "24", max: "120" },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Lab Process",
      required: false,
      nullable: true,
      desc: "Time for organism growth detection",
    },
  ],
};
