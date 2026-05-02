import { BasePanelTest } from "@/lib/constants-types";

export interface DDimerTest extends BasePanelTest {}

export interface DDimerPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: DDimerTest[];
}

export const DDIMER_PANEL: DDimerPanel = {
  panelKey: "d_dimer",
  title: "D-Dimer Test Panel",
  clinicalCategory: "Hematology / Coagulation",
  specimenType: "Plasma (Citrated)",

  tests: [
    {
      key: "d_dimer",
      name: "D-Dimer",
      unit: "µg/mL FEU",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 0.5,
        },
        female: {
          min: 0,
          max: 0.5,
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Plasma",
      required: true,
      nullable: false,
      desc: "Marker of fibrin degradation (clot breakdown)",
    },

    {
      key: "quantitative_ddimer",
      name: "Quantitative D-Dimer",
      unit: "ng/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 500,
        },
        female: {
          min: 0,
          max: 500,
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Plasma",
      required: false,
      nullable: true,
      desc: "Exact measurement of fibrin degradation products",
    },

    {
      key: "qualitative_ddimer",
      name: "Qualitative D-Dimer",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant clot breakdown",
          max: "No significant clot breakdown",
        },
        female: {
          min: "No significant clot breakdown",
          max: "No significant clot breakdown",
        },
      },
      clinicalCategory: "Coagulation",
      specimenType: "Plasma",
      required: false,
      nullable: true,
      desc: "Screening version of D-dimer test",
    },

    {
      key: "thrombosis_risk_indicator",
      name: "Thrombosis Risk Indicator",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Low risk of thrombosis",
          max: "Low risk of thrombosis",
        },
        female: {
          min: "Low risk of thrombosis",
          max: "Low risk of thrombosis",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Clinical risk estimation based on D-dimer level",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No active clot formation or breakdown",
          max: "No active clot formation or breakdown",
        },
        female: {
          min: "No active clot formation or breakdown",
          max: "No active clot formation or breakdown",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall interpretation of coagulation activity",
    },
  ],
};
