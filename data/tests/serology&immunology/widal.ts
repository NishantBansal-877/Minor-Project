import { BasePanelTest } from "@/lib/constants-types";

export interface WidalTest extends BasePanelTest {}

export interface WidalPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: WidalTest[];
}

export const WIDAL_PANEL: WidalPanel = {
  panelKey: "widal",
  title: "Widal Test (Enteric Fever Serology)",
  clinicalCategory: "Infectious Diseases / Bacteriology",
  specimenType: "Serum",

  tests: [
    {
      key: "salmonella_typhi_O",
      name: "Salmonella Typhi O Antibody",
      unit: "titer",
      dataType: "float",
      referenceRange: {
        male: {
          min: "1:0",
          max: "1:80",
        },
        female: {
          min: "1:0",
          max: "1:80",
        },
      },
      clinicalCategory: "Bacteriology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Detects somatic O antigen antibodies (acute infection marker)",
    },

    {
      key: "salmonella_typhi_H",
      name: "Salmonella Typhi H Antibody",
      unit: "titer",
      dataType: "float",
      referenceRange: {
        male: {
          min: "1:0",
          max: "1:80",
        },
        female: {
          min: "1:0",
          max: "1:80",
        },
      },
      clinicalCategory: "Bacteriology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Detects flagellar H antigen antibodies (past or current infection)",
    },

    {
      key: "salmonella_paratyphi_A_O",
      name: "Salmonella Paratyphi A O Antibody",
      unit: "titer",
      dataType: "float",
      referenceRange: {
        male: {
          min: "1:0",
          max: "1:80",
        },
        female: {
          min: "1:0",
          max: "1:80",
        },
      },
      clinicalCategory: "Bacteriology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Paratyphoid A O antigen response",
    },

    {
      key: "salmonella_paratyphi_A_H",
      name: "Salmonella Paratyphi A H Antibody",
      unit: "titer",
      dataType: "float",
      referenceRange: {
        male: {
          min: "1:0",
          max: "1:80",
        },
        female: {
          min: "1:0",
          max: "1:80",
        },
      },
      clinicalCategory: "Bacteriology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Paratyphoid A H antigen response",
    },

    {
      key: "salmonella_paratyphi_B_O",
      name: "Salmonella Paratyphi B O Antibody",
      unit: "titer",
      dataType: "float",
      referenceRange: {
        male: {
          min: "1:0",
          max: "1:80",
        },
        female: {
          min: "1:0",
          max: "1:80",
        },
      },
      clinicalCategory: "Bacteriology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Paratyphoid B O antigen response",
    },

    {
      key: "salmonella_paratyphi_B_H",
      name: "Salmonella Paratyphi B H Antibody",
      unit: "titer",
      dataType: "float",
      referenceRange: {
        male: {
          min: "1:0",
          max: "1:80",
        },
        female: {
          min: "1:0",
          max: "1:80",
        },
      },
      clinicalCategory: "Bacteriology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Paratyphoid B H antigen response",
    },

    {
      key: "interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant titer rise",
          max: "No significant titer rise",
        },
        female: {
          min: "No significant titer rise",
          max: "No significant titer rise",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall interpretation based on antibody titers",
    },
  ],
};
