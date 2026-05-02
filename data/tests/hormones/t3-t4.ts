import { BasePanelTest } from "@/lib/constants-types";

export interface T3T4Test extends BasePanelTest {}

export interface T3T4Panel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: T3T4Test[];
}

export const T3_T4_PANEL: T3T4Panel = {
  panelKey: "t3_t4",
  title: "T3 / T4 Thyroid Hormone Panel",
  clinicalCategory: "Endocrinology",
  specimenType: "Serum",

  tests: [
    {
      key: "total_t3",
      name: "Total T3 (Triiodothyronine)",
      unit: "ng/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 80,
          max: 200,
        },
        female: {
          min: 80,
          max: 200,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Measures total circulating T3 hormone",
    },

    {
      key: "free_t3",
      name: "Free T3",
      unit: "pg/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 2.0,
          max: 4.4,
        },
        female: {
          min: 2.0,
          max: 4.4,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Biologically active thyroid hormone",
    },

    {
      key: "total_t4",
      name: "Total T4 (Thyroxine)",
      unit: "µg/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 5.0,
          max: 12.0,
        },
        female: {
          min: 5.0,
          max: 12.0,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Total thyroxine hormone level",
    },

    {
      key: "free_t4",
      name: "Free T4",
      unit: "ng/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.8,
          max: 1.8,
        },
        female: {
          min: 0.8,
          max: 1.8,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Active unbound thyroxine",
    },

    {
      key: "t3_t4_ratio",
      name: "T3/T4 Ratio",
      unit: "ratio",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.02,
          max: 0.04,
        },
        female: {
          min: 0.02,
          max: 0.04,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Helps assess thyroid conversion efficiency",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Euthyroid state (normal thyroid function)",
          max: "Euthyroid state (normal thyroid function)",
        },
        female: {
          min: "Euthyroid state (normal thyroid function)",
          max: "Euthyroid state (normal thyroid function)",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall thyroid hormone status interpretation",
    },
  ],
};
