import { BasePanelTest } from "@/lib/constants-types";

export interface TestosteroneTest extends BasePanelTest {}

export interface TestosteronePanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: TestosteroneTest[];
}

export const TESTOSTERONE_PANEL: TestosteronePanel = {
  panelKey: "testosterone",
  title: "Testosterone Hormone Panel",
  clinicalCategory: "Endocrinology / Andrology",
  specimenType: "Serum",

  tests: [
    {
      key: "total_testosterone",
      name: "Total Testosterone",
      unit: "ng/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 300,
          max: 1000,
        },
        female: {
          min: 15,
          max: 70,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: true,
      nullable: false,
      desc: "Total circulating testosterone (bound + free)",
    },

    {
      key: "free_testosterone",
      name: "Free Testosterone",
      unit: "pg/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 5,
          max: 21,
        },
        female: {
          min: 0.1,
          max: 6.4,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Biologically active unbound testosterone",
    },

    {
      key: "bioavailable_testosterone",
      name: "Bioavailable Testosterone",
      unit: "ng/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 110,
          max: 575,
        },
        female: {
          min: 0,
          max: 0,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Free + albumin-bound testosterone",
    },

    {
      key: "shbg",
      name: "Sex Hormone Binding Globulin (SHBG)",
      unit: "nmol/L",
      dataType: "float",
      referenceRange: {
        male: {
          min: 10,
          max: 57,
        },
        female: {
          min: 18,
          max: 144,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Protein binding testosterone",
    },

    {
      key: "lh",
      name: "Luteinizing Hormone (LH)",
      unit: "mIU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 1.5,
          max: 9.3,
        },
        female: {
          min: 2,
          max: 12,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Stimulates testosterone production",
    },

    {
      key: "fsh",
      name: "Follicle Stimulating Hormone (FSH)",
      unit: "mIU/mL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 1.4,
          max: 18.1,
        },
        female: {
          min: 3,
          max: 10,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Regulates reproductive function",
    },

    {
      key: "dht",
      name: "Dihydrotestosterone (DHT)",
      unit: "ng/dL",
      dataType: "float",
      referenceRange: {
        male: {
          min: 30,
          max: 85,
        },
        female: {
          min: 0,
          max: 0,
        },
      },
      clinicalCategory: "Endocrinology",
      specimenType: "Serum",
      required: false,
      nullable: true,
      desc: "Potent androgen derived from testosterone",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal androgen status",
          max: "Normal androgen status",
        },
        female: {
          min: "Normal androgen status",
          max: "Normal androgen status",
        },
      },
      clinicalCategory: "Clinical Interpretation",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall hormonal balance assessment",
    },
  ],
};
