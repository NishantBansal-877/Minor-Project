import { BasePanelTest } from "@/lib/constants-types";

export interface ProlactinTest extends BasePanelTest {}

export interface ProlactinPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: ProlactinTest[];
}

export const PROLACTIN_PANEL: ProlactinPanel = {
  panelKey: "prolactin",
  title: "Prolactin Hormone Panel",
  clinicalCategory: "Endocrinology / Reproductive Health",
  specimenType: "Serum",

  tests: [
    {
      key: "serum_prolactin",
      name: "Serum Prolactin",
      unit: "ng/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 4,
          max: 15,
        },
        female: {
          min: 4,
          max: 25,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Primary hormone regulating lactation",
    },

    {
      key: "macroprolactin",
      name: "Macroprolactin",
      unit: "ng/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 0,
          max: 40,
        },
        female: {
          min: 0,
          max: 40,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Biologically inactive prolactin form",
    },

    {
      key: "prolactin_stress_response",
      name: "Stress-Induced Prolactin Elevation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant rise",
          max: "No significant rise",
        },
        female: {
          min: "No significant rise",
          max: "No significant rise",
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Prolactin rise due to stress, exercise, or sleep",
    },

    {
      key: "dopamine_inhibition_effect",
      name: "Dopamine Inhibition Effect",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Prolactin suppressed by dopamine",
          max: "Prolactin suppressed by dopamine",
        },
        female: {
          min: "Prolactin suppressed by dopamine",
          max: "Prolactin suppressed by dopamine",
        },
      },
      clinicalCategory: "Neuroendocrinology",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Assessment of hypothalamic regulation",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal prolactin level",
          max: "Normal prolactin level",
        },
        female: {
          min: "Normal prolactin level",
          max: "Normal prolactin level",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall hormonal assessment",
    },
  ],
};
