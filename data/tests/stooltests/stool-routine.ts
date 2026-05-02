import { BasePanelTest } from "@/lib/constants-types";

export interface StoolRoutineTest extends BasePanelTest {}

export interface StoolRoutinePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: StoolRoutineTest[];
}

export const STOOL_ROUTINE_PANEL: StoolRoutinePanel = {
  panelKey: "stool_routine",
  title: "Stool Routine Examination (Stool Analysis)",
  clinicalCategory: "Gastroenterology / Clinical Pathology",
  specimenType: "Fresh Stool Sample",

  tests: [
    {
      key: "color",
      name: "Stool Color",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Brown",
          max: "Brown",
        },
        female: {
          min: "Brown",
          max: "Brown",
        },
      },
      clinicalCategory: "Macroscopic Examination",
      specimenType: "Stool",
      required: true,
      nullable: false,
      desc: "Normal stool color assessment",
    },

    {
      key: "consistency",
      name: "Consistency",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Formed",
          max: "Formed",
        },
        female: {
          min: "Formed",
          max: "Formed",
        },
      },
      clinicalCategory: "Macroscopic Examination",
      specimenType: "Stool",
      required: true,
      nullable: false,
      desc: "Shape and firmness of stool",
    },

    {
      key: "mucus",
      name: "Mucus",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      clinicalCategory: "Macroscopic Examination",
      specimenType: "Stool",
      required: true,
      nullable: false,
      desc: "Indicates intestinal inflammation",
    },

    {
      key: "blood",
      name: "Blood (Gross)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      clinicalCategory: "Macroscopic Examination",
      specimenType: "Stool",
      required: true,
      nullable: false,
      desc: "Visible blood in stool",
    },

    {
      key: "occult_blood",
      name: "Occult Blood (FOBT)",
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
      clinicalCategory: "Biochemistry",
      specimenType: "Stool",
      required: true,
      nullable: false,
      desc: "Hidden gastrointestinal bleeding",
    },

    {
      key: "pus_cells",
      name: "Pus Cells",
      unit: "cells/HPF",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 5,
        },
        female: {
          min: 0,
          max: 5,
        },
      },
      clinicalCategory: "Microscopy",
      specimenType: "Stool Microscopy",
      required: true,
      nullable: false,
      desc: "Indicator of intestinal infection",
    },

    {
      key: "rbcs",
      name: "Red Blood Cells (RBC)",
      unit: "cells/HPF",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 2,
        },
        female: {
          min: 0,
          max: 2,
        },
      },
      clinicalCategory: "Microscopy",
      specimenType: "Stool Microscopy",
      required: true,
      nullable: false,
      desc: "Indicates intestinal bleeding",
    },

    {
      key: "ova_parasites",
      name: "Ova & Parasites",
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
      desc: "Detection of intestinal parasites",
    },

    {
      key: "fat_globules",
      name: "Fat Globules",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      clinicalCategory: "Malabsorption",
      specimenType: "Stool Microscopy",
      required: false,
      nullable: true,
      desc: "Fat malabsorption indicator",
    },

    {
      key: "vegetable_cells",
      name: "Undigested Food Particles",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Occasional",
          max: "Occasional",
        },
        female: {
          min: "Occasional",
          max: "Occasional",
        },
      },
      clinicalCategory: "Digestive Function",
      specimenType: "Stool Microscopy",
      required: false,
      nullable: true,
      desc: "Dietary residue analysis",
    },

    {
      key: "ph",
      name: "Stool pH",
      unit: null,
      dataType: "float",
      referenceRange: {
        male: {
          min: 6.5,
          max: 7.5,
        },
        female: {
          min: 6.5,
          max: 7.5,
        },
      },
      clinicalCategory: "Biochemistry",
      specimenType: "Stool",
      required: false,
      nullable: true,
      desc: "Acidity of stool",
    },
  ],
};
