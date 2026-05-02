import { BasePanelTest } from "@/lib/constants-types";

export interface UrineRoutineTest extends BasePanelTest {}

export interface UrineRoutinePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: UrineRoutineTest[];
}

export const URINE_ROUTINE_PANEL: UrineRoutinePanel = {
  panelKey: "urine_routine",
  title: "Urine Routine Examination (Urinalysis)",
  clinicalCategory: "Nephrology / Clinical Pathology",
  specimenType: "Fresh Midstream Urine",

  tests: [
    {
      key: "color",
      name: "Urine Color",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Pale yellow",
          max: "Amber",
        },
        female: {
          min: "Pale yellow",
          max: "Amber",
        },
      },
      clinicalCategory: "Macroscopy",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Visual appearance of urine",
    },

    {
      key: "appearance",
      name: "Urine Appearance (Clarity)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Clear",
          max: "Clear",
        },
        female: {
          min: "Clear",
          max: "Clear",
        },
      },
      clinicalCategory: "Macroscopy",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Turbidity of urine sample",
    },

    {
      key: "specific_gravity",
      name: "Specific Gravity",
      unit: null,
      dataType: "float",
      referenceRange: {
        male: {
          min: 1.005,
          max: 1.03,
        },
        female: {
          min: 1.005,
          max: 1.03,
        },
      },
      clinicalCategory: "Renal Function",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Urine concentration ability",
    },

    {
      key: "ph",
      name: "Urine pH",
      unit: null,
      dataType: "float",
      referenceRange: {
        male: {
          min: 4.5,
          max: 8.0,
        },
        female: {
          min: 4.5,
          max: 8.0,
        },
      },
      clinicalCategory: "Renal Function",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Acidity or alkalinity of urine",
    },

    {
      key: "protein",
      name: "Protein",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Trace",
        },
        female: {
          min: "Absent",
          max: "Trace",
        },
      },
      clinicalCategory: "Biochemistry",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Proteinuria indicator",
    },

    {
      key: "glucose",
      name: "Glucose",
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
      clinicalCategory: "Biochemistry",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Sugar in urine",
    },

    {
      key: "ketones",
      name: "Ketone Bodies",
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
      clinicalCategory: "Biochemistry",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Fat metabolism byproduct",
    },

    {
      key: "bilirubin",
      name: "Bilirubin",
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
      clinicalCategory: "Hepatobiliary",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Liver dysfunction marker",
    },

    {
      key: "urobilinogen",
      name: "Urobilinogen",
      unit: null,
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.2,
          max: 1.0,
        },
        female: {
          min: 0.2,
          max: 1.0,
        },
      },
      clinicalCategory: "Hepatobiliary",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Liver and hemolysis indicator",
    },

    {
      key: "nitrite",
      name: "Nitrite",
      unit: null,
      dataType: "boolean",
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
      clinicalCategory: "Infection",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "Bacterial UTI marker",
    },

    {
      key: "leukocyte_esterase",
      name: "Leukocyte Esterase",
      unit: null,
      dataType: "boolean",
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
      clinicalCategory: "Infection",
      specimenType: "Urine",
      required: true,
      nullable: false,
      desc: "White blood cell enzyme marker",
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
      specimenType: "Urine Microscopy",
      required: true,
      nullable: false,
      desc: "Hematuria indicator",
    },

    {
      key: "wbcs",
      name: "White Blood Cells (WBC)",
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
      specimenType: "Urine Microscopy",
      required: true,
      nullable: false,
      desc: "Pyuria indicator",
    },

    {
      key: "epithelial_cells",
      name: "Epithelial Cells",
      unit: "cells/HPF",
      dataType: "float",
      referenceRange: {
        male: {
          min: "Few",
          max: "Few",
        },
        female: {
          min: "Few",
          max: "Few",
        },
      },
      clinicalCategory: "Microscopy",
      specimenType: "Urine Microscopy",
      required: false,
      nullable: true,
      desc: "Sample contamination indicator",
    },

    {
      key: "casts",
      name: "Casts",
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
      clinicalCategory: "Microscopy",
      specimenType: "Urine Microscopy",
      required: false,
      nullable: true,
      desc: "Renal tubular pathology marker",
    },

    {
      key: "crystals",
      name: "Crystals",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "None",
          max: "Occasional",
        },
        female: {
          min: "None",
          max: "Occasional",
        },
      },
      clinicalCategory: "Microscopy",
      specimenType: "Urine Microscopy",
      required: false,
      nullable: true,
      desc: "Stone formation risk indicator",
    },
  ],
};
