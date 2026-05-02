import { BasePanelTest } from "@/lib/constants-types";

export interface TSHTest extends BasePanelTest {}

export interface TSHPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: TSHTest[];
}

export const TSH_PANEL: TSHPanel = {
  panelKey: "tsh",
  title: "Thyroid Stimulating Hormone (TSH) Test",
  clinicalCategory: "Endocrinology",
  specimenType: "Serum",

  tests: [
    {
      key: "tsh",
      name: "TSH (Thyroid Stimulating Hormone)",
      unit: "mIU/L",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0.4,
          max: 4.5,
        },
        female: {
          min: 0.4,
          max: 4.5,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Primary screening marker for thyroid function",
    },

    {
      key: "free_t3",
      name: "Free T3 (Triiodothyronine)",
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
      desc: "Active thyroid hormone",
    },

    {
      key: "free_t4",
      name: "Free T4 (Thyroxine)",
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
      desc: "Thyroid hormone precursor",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Euthyroid (normal thyroid function)",
          max: "Euthyroid (normal thyroid function)",
        },
        female: {
          min: "Euthyroid (normal thyroid function)",
          max: "Euthyroid (normal thyroid function)",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall thyroid status interpretation",
    },
  ],
};
