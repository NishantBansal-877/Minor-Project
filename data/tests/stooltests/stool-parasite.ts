import { BasePanelTest } from "@/lib/constants-types";

export interface OvaParasiteTest extends BasePanelTest {}

export interface OvaParasitePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: OvaParasiteTest[];
}

export const OVA_PARASITE_PANEL: OvaParasitePanel = {
  panelKey: "ova_parasite",
  title: "Ova & Parasite Examination (O&P Test)",
  clinicalCategory: "Parasitology / Gastroenterology",
  specimenType: "Fresh Stool Sample",

  tests: [
    {
      key: "ova_detected",
      name: "Ova (Helminth Eggs)",
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
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: true,
      nullable: false,
      desc: "Detection of intestinal worm eggs",
    },

    {
      key: "parasites_detected",
      name: "Parasites (Protozoa/Helminths)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No parasites seen",
          max: "No parasites seen",
        },
        female: {
          min: "No parasites seen",
          max: "No parasites seen",
        },
      },
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: true,
      nullable: false,
      desc: "Detection of protozoa or helminths",
    },

    {
      key: "giardia_lamblia",
      name: "Giardia lamblia",
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
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: false,
      nullable: true,
      desc: "Common protozoal infection causing diarrhea",
    },

    {
      key: "entamoeba_histolytica",
      name: "Entamoeba histolytica",
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
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: false,
      nullable: true,
      desc: "Amoebic dysentery parasite",
    },

    {
      key: "ascaris_lumbricoides",
      name: "Ascaris lumbricoides",
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
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: false,
      nullable: true,
      desc: "Roundworm infection",
    },

    {
      key: "hookworm",
      name: "Hookworm",
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
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: false,
      nullable: true,
      desc: "Helminth causing anemia",
    },

    {
      key: "trichuris_trichiura",
      name: "Trichuris trichiura (Whipworm)",
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
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: false,
      nullable: true,
      desc: "Whipworm infection",
    },

    {
      key: "cysts_seen",
      name: "Cysts Seen",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "None",
          max: "None",
        },
        female: {
          min: "None",
          max: "None",
        },
      },
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: true,
      nullable: false,
      desc: "Protozoan cyst detection",
    },

    {
      key: "trophozoites_seen",
      name: "Trophozoites Seen",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "None",
          max: "None",
        },
        female: {
          min: "None",
          max: "None",
        },
      },
      clinicalCategory: "Parasitology",
      specimenType: "Stool Microscopy",
      required: false,
      nullable: true,
      desc: "Active protozoan forms",
    },

    {
      key: "overall_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No parasitic infection detected",
          max: "No parasitic infection detected",
        },
        female: {
          min: "No parasitic infection detected",
          max: "No parasitic infection detected",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Summary of parasitic findings",
    },
  ],
};
