import { BasePanelTest } from "@/lib/constants-types";

export interface RBSTest extends BasePanelTest {}

export interface RBSPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: RBSTest[];
}

export const RBS_PANEL: RBSPanel = {
  panelKey: "rbs",

  title: "Random Blood Sugar (RBS)",

  clinicalCategory: "Biochemistry / Endocrinology",

  specimenType: "Venous or Capillary Blood",

  tests: [
    {
      key: "rbs",

      name: "Random Blood Glucose",

      desc: "Blood glucose level measured at any time of the day regardless of fasting",

      unit: "mg/dL",

      dataType: "float",

      referenceRange: {
        male: {
          min: 70,
          max: 139,
        },

        female: {
          min: 70,
          max: 139,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Plasma",

      required: true,

      nullable: false,
    },

    {
      key: "measurement_method",

      name: "Measurement Method",

      desc: "Laboratory method used for glucose estimation",

      unit: null,

      dataType: "string",

      referenceRange: {
        male: {
          min: "Glucose oxidase / Hexokinase method",
          max: "Glucose oxidase / Hexokinase method",
        },

        female: {
          min: "Glucose oxidase / Hexokinase method",
          max: "Glucose oxidase / Hexokinase method",
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Plasma",

      required: true,

      nullable: false,
    },

    {
      key: "last_meal_time",

      name: "Time Since Last Meal",

      desc: "Time gap between last food intake and sample collection",

      unit: "hours",

      dataType: "float",

      referenceRange: {
        male: {
          min: 0,
          max: 24,
        },

        female: {
          min: 0,
          max: 24,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Patient Condition",

      required: false,

      nullable: true,
    },

    {
      key: "symptoms_present",

      name: "Symptoms Present",

      desc: "Diabetes symptoms like polyuria, polydipsia, weight loss",

      unit: null,

      dataType: "string",

      referenceRange: {
        male: {
          min: "No symptoms",
          max: "No symptoms",
        },

        female: {
          min: "No symptoms",
          max: "No symptoms",
        },
      },

      clinicalCategory: "Endocrinology",

      specimenType: "Clinical Observation",

      required: false,

      nullable: true,
    },

    {
      key: "interpretation",

      name: "Clinical Interpretation",

      desc: "Diagnostic interpretation based on glucose level and symptoms",

      unit: null,

      dataType: "string",

      referenceRange: {
        male: {
          min: "Normal",
          max: "Normal",
        },

        female: {
          min: "Normal",
          max: "Normal",
        },
      },

      clinicalCategory: "Endocrinology",

      specimenType: "Report Output",

      required: false,

      nullable: true,
    },
  ],
};
