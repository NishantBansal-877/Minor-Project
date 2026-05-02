import { BasePanelTest } from "@/lib/constants-types";

export interface AFPTest extends BasePanelTest {}

export interface AFPPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: AFPTest[];
}

export const AFP_PANEL: AFPPanel = {
  panelKey: "afp",
  title: "Alpha-Fetoprotein (AFP) Panel",
  clinicalCategory: "Oncology / Hepatology / Obstetrics",
  specimenType: "Serum",

  tests: [
    {
      key: "serum_afp",
      name: "Serum AFP",
      unit: "ng/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 10,
        },
        female: {
          min: 0,
          max: 10,
        },
      },
      clinicalCategory: "Oncology / Hepatology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Tumor marker mainly for hepatocellular carcinoma (HCC)",
    },

    {
      key: "afp_trend",
      name: "AFP Trend",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Stable AFP level",
          max: "Stable AFP level",
        },
        female: {
          min: "Stable AFP level",
          max: "Stable AFP level",
        },
      },
      clinicalCategory: "Oncology Monitoring",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Changes in AFP levels over time",
    },

    {
      key: "afp_pregnancy",
      name: "AFP in Pregnancy",
      unit: "ng/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 0,
        },
        female: {
          min: 10,
          max: 500,
        },
      },
      clinicalCategory: "Obstetrics",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Used in prenatal screening for neural tube defects",
    },

    {
      key: "afp_liver_disease_indicator",
      name: "Liver Disease Indicator",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant liver pathology",
          max: "No significant liver pathology",
        },
        female: {
          min: "No significant liver pathology",
          max: "No significant liver pathology",
        },
      },
      clinicalCategory: "Hepatology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Association of AFP elevation with liver disease",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No tumor marker elevation detected",
          max: "No tumor marker elevation detected",
        },
        female: {
          min: "No tumor marker elevation detected",
          max: "No tumor marker elevation detected",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall clinical interpretation of AFP levels",
    },
  ],
};
