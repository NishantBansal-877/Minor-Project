import { BasePanelTest } from "@/lib/constants-types";

export interface CEATest extends BasePanelTest {}

export interface CEAPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: CEATest[];
}

export const CEA_PANEL: CEAPanel = {
  panelKey: "cea",
  title: "Carcinoembryonic Antigen (CEA) Panel",
  clinicalCategory: "Oncology / Gastroenterology",
  specimenType: "Serum",

  tests: [
    {
      key: "serum_cea",
      name: "Serum CEA",
      unit: "ng/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 3,
        },
        female: {
          min: 0,
          max: 3,
        },
      },
      clinicalCategory: "Oncology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Tumor marker mainly used for colorectal cancer monitoring",
    },

    {
      key: "cea_trend",
      name: "CEA Trend",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Stable disease status",
          max: "Stable disease status",
        },
        female: {
          min: "Stable disease status",
          max: "Stable disease status",
        },
      },
      clinicalCategory: "Oncology Monitoring",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Serial trend of CEA for treatment monitoring",
    },

    {
      key: "cea_smoking_effect",
      name: "Smoking Influence on CEA",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Mild elevation possible in smokers",
          max: "Mild elevation possible in smokers",
        },
        female: {
          min: "Mild elevation possible in smokers",
          max: "Mild elevation possible in smokers",
        },
      },
      clinicalCategory: "Clinical Factors",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Adjustment factor for smoking status affecting CEA levels",
    },

    {
      key: "cea_associated_cancers",
      name: "Associated Malignancies Indicator",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No malignancy indicated",
          max: "No malignancy indicated",
        },
        female: {
          min: "No malignancy indicated",
          max: "No malignancy indicated",
        },
      },
      clinicalCategory: "Oncology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Cancer types commonly associated with elevated CEA",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant tumor marker elevation",
          max: "No significant tumor marker elevation",
        },
        female: {
          min: "No significant tumor marker elevation",
          max: "No significant tumor marker elevation",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall interpretation of CEA results in clinical context",
    },
  ],
};
