import { BasePanelTest } from "@/lib/constants-types";

export interface BloodCultureTest extends BasePanelTest {}

export interface BloodCulturePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: BloodCultureTest[];
}

export const BLOOD_CULTURE_PANEL: BloodCulturePanel = {
  panelKey: "blood_culture",
  title: "Blood Culture (Aerobic & Anaerobic)",
  clinicalCategory: "Microbiology",
  specimenType: "Blood (Sterile Collection - Aerobic/Anaerobic Bottles)",

  tests: [
    {
      key: "culture_result",
      name: "Culture Result",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No growth after incubation period / No growth detected / Growth of pathogenic organism detected",
          max: "No growth after incubation period / No growth detected / Growth of pathogenic organism detected",
        },
        female: {
          min: "No growth after incubation period / No growth detected / Growth of pathogenic organism detected",
          max: "No growth after incubation period / No growth detected / Growth of pathogenic organism detected",
        },
      },
      clinicalCategory: "Microbiology",
      specimenType: "Blood Culture Bottle",
      required: true,
      nullable: false,
      desc: "Indicates whether microorganisms are present in the blood sample after incubation.",
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
      desc: "Specifies the exact microorganism identified if culture is positive.",
    },
  ],
};
