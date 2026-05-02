import { BasePanelTest } from "@/lib/constants-types";

export interface LFTTest extends BasePanelTest {}

export interface LFTPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: LFTTest[];
}

export const LFT_PANEL: LFTPanel = {
  panelKey: "lft",

  title: "Liver Function Test (LFT)",

  clinicalCategory: "Biochemistry / Hepatology",

  specimenType: "Serum",

  tests: [
    {
      key: "bilirubin_total",

      name: "Total Bilirubin",

      desc: "Total bilirubin in blood (direct + indirect)",

      unit: "mg/dL",

      dataType: "float",

      referenceRange: {
        male: {
          min: 0.3,
          max: 1.2,
        },

        female: {
          min: 0.3,
          max: 1.2,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Serum",

      required: true,

      nullable: false,
    },

    {
      key: "bilirubin_direct",

      name: "Direct Bilirubin",

      desc: "Conjugated bilirubin",

      unit: "mg/dL",

      dataType: "float",

      referenceRange: {
        male: {
          min: 0.0,
          max: 0.3,
        },

        female: {
          min: 0.0,
          max: 0.3,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Serum",

      required: true,

      nullable: false,
    },

    {
      key: "bilirubin_indirect",

      name: "Indirect Bilirubin",

      desc: "Unconjugated bilirubin",

      unit: "mg/dL",

      dataType: "float",

      referenceRange: {
        male: {
          min: 0.2,
          max: 0.8,
        },

        female: {
          min: 0.2,
          max: 0.8,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Serum",

      required: true,

      nullable: false,
    },

    {
      key: "alt",

      name: "ALT (SGPT)",

      desc: "Liver enzyme indicating hepatocellular damage",

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

      required: true,

      nullable: false,
    },

    {
      key: "ast",

      name: "AST (SGOT)",

      desc: "Enzyme found in liver and muscle",

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

      required: true,

      nullable: false,
    },

    {
      key: "alkaline_phosphatase",

      name: "Alkaline Phosphatase (ALP)",

      desc: "Enzyme related to bile duct and bone activity",

      unit: "U/L",

      dataType: "float",

      referenceRange: {
        male: {
          min: 44,
          max: 147,
        },

        female: {
          min: 44,
          max: 147,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Serum",

      required: true,

      nullable: false,
    },

    {
      key: "ggt",

      name: "Gamma Glutamyl Transferase (GGT)",

      desc: "Marker of bile duct injury and alcohol-related liver disease",

      unit: "U/L",

      dataType: "float",

      referenceRange: {
        male: {
          min: 8,
          max: 61,
        },

        female: {
          min: 5,
          max: 36,
        },
      },

      clinicalCategory: "Hepatology",

      specimenType: "Serum",

      required: true,

      nullable: false,
    },

    {
      key: "albumin",

      name: "Serum Albumin",

      desc: "Main liver-produced plasma protein",

      unit: "g/dL",

      dataType: "float",

      referenceRange: {
        male: {
          min: 3.5,
          max: 5.0,
        },

        female: {
          min: 3.5,
          max: 5.0,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Serum",

      required: true,

      nullable: false,
    },

    {
      key: "globulin",

      name: "Serum Globulin",

      desc: "Immune-related blood protein fraction",

      unit: "g/dL",

      dataType: "float",

      referenceRange: {
        male: {
          min: 2.0,
          max: 3.5,
        },

        female: {
          min: 2.0,
          max: 3.5,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Serum",

      required: true,

      nullable: false,
    },

    {
      key: "albumin_globulin_ratio",

      name: "A/G Ratio",

      desc: "Albumin to globulin ratio",

      unit: "ratio",

      dataType: "float",

      referenceRange: {
        male: {
          min: 1.0,
          max: 2.2,
        },

        female: {
          min: 1.0,
          max: 2.2,
        },
      },

      clinicalCategory: "Biochemistry",

      specimenType: "Calculated",

      required: false,

      nullable: true,
    },
  ],
};
