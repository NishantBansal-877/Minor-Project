import { BasePanelTest } from "@/lib/constants-types";

export interface CA19_9Test extends BasePanelTest {}

export interface CA19_9Panel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: CA19_9Test[];
}

export const CA19_9_PANEL: CA19_9Panel = {
  panelKey: "ca_19_9",
  title: "Cancer Antigen 19-9 (CA 19-9) Panel",
  clinicalCategory: "Oncology / Gastroenterology",
  specimenType: "Serum",

  tests: [
    {
      key: "ca19_9",
      name: "CA 19-9",
      unit: "U/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 37,
        },
        female: {
          min: 0,
          max: 37,
        },
      },
      clinicalCategory: "Oncology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Tumor marker primarily associated with pancreatic cancer",
    },

    {
      key: "ca19_9_trend",
      name: "CA 19-9 Trend",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Treatment response / improvement",
          max: "Possible disease progression",
        },
        female: {
          min: "Treatment response / improvement",
          max: "Possible disease progression",
        },
      },
      clinicalCategory: "Oncology Monitoring",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Trend of CA 19-9 over time for treatment monitoring",
    },

    {
      key: "pancreatic_cancer_indicator",
      name: "Pancreatic Cancer Indicator",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Low suspicion",
          max: "High suspicion of pancreatic malignancy",
        },
        female: {
          min: "Low suspicion",
          max: "High suspicion of pancreatic malignancy",
        },
      },
      clinicalCategory: "Oncology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Risk stratification for pancreatic malignancy",
    },

    {
      key: "biliary_obstruction_effect",
      name: "Biliary Obstruction Effect",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No obstruction-related elevation",
          max: "Elevated due to cholestasis or biliary obstruction",
        },
        female: {
          min: "No obstruction-related elevation",
          max: "Elevated due to cholestasis or biliary obstruction",
        },
      },
      clinicalCategory: "Hepatobiliary",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Non-malignant causes of CA 19-9 elevation",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant tumor marker elevation",
          max: "Possible pancreatic or gastrointestinal malignancy",
        },
        female: {
          min: "No significant tumor marker elevation",
          max: "Possible pancreatic or gastrointestinal malignancy",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall clinical interpretation of CA 19-9 level",
    },
  ],
};
