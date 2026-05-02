import { BasePanelTest } from "@/lib/constants-types";

export interface RFTest extends BasePanelTest {}

export interface RFPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: RFTest[];
}

export const RF_PANEL: RFPanel = {
  panelKey: "rheumatoid_factor",
  title: "Rheumatoid Factor (RF) Panel",
  clinicalCategory: "Autoimmune / Rheumatology",
  specimenType: "Serum",

  tests: [
    {
      key: "rf_igg",
      name: "Rheumatoid Factor (IgG)",
      unit: "IU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 20,
        },
        female: {
          min: 0,
          max: 20,
        },
      },
      clinicalCategory: "Autoimmune",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Autoantibody associated with rheumatoid arthritis",
    },

    {
      key: "rf_igm",
      name: "Rheumatoid Factor (IgM)",
      unit: "IU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 20,
        },
        female: {
          min: 0,
          max: 20,
        },
      },
      clinicalCategory: "Autoimmune",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Most commonly detected RF subtype",
    },

    {
      key: "rf_iga",
      name: "Rheumatoid Factor (IgA)",
      unit: "IU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 20,
        },
        female: {
          min: 0,
          max: 20,
        },
      },
      clinicalCategory: "Autoimmune",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Associated with more severe disease activity",
    },

    {
      key: "rf_total",
      name: "Total Rheumatoid Factor",
      unit: "IU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 20,
        },
        female: {
          min: 0,
          max: 20,
        },
      },
      clinicalCategory: "Autoimmune",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Overall rheumatoid factor antibody level",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Negative for rheumatoid factor",
          max: "Negative for rheumatoid factor",
        },
        female: {
          min: "Negative for rheumatoid factor",
          max: "Negative for rheumatoid factor",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall clinical interpretation of RF results",
    },
  ],
};
