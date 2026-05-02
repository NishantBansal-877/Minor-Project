export interface ReferenceRangeValue {
  min: string | number;
  max: string | number;
}

export interface ReferenceRange {
  male?: ReferenceRangeValue;
  female?: ReferenceRangeValue;
  normal?: ReferenceRangeValue;
  [key: string]: ReferenceRangeValue | undefined;
}

export type DataType = "string" | "object" | "boolean";

export interface PBSTest {
  key: string;
  name: string;
  desc?: string;
  unit: string | null;
  dataType: DataType;
  referenceRange: string | ReferenceRange;
  required: boolean;
  nullable: boolean;
}

export interface PBSPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: PBSTest[];
}

export const PBS_PANEL: PBSPanel = {
  panelKey: "peripheral_smear",
  title: "Peripheral Blood Smear Examination",
  clinicalCategory: "Hematology",
  specimenType: "Peripheral Blood Smear (EDTA Blood on Glass Slide)",

  tests: [
    {
      key: "rbc_morphology",
      name: "RBC Morphology",
      desc: "Evaluation of red blood cell shape, size, and color",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normocytic, Normochromic",
          max: "Normocytic, Normochromic",
        },
        female: {
          min: "Normocytic, Normochromic",
          max: "Normocytic, Normochromic",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "anisocytosis",
      name: "Anisocytosis",
      desc: "Variation in red blood cell size",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "poikilocytosis",
      name: "Poikilocytosis",
      desc: "Variation in red blood cell shape",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "hypochromia",
      name: "Hypochromia",
      desc: "Reduced hemoglobin in RBCs (pale cells)",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "microcytosis",
      name: "Microcytosis",
      desc: "Smaller than normal RBCs",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "macrocytosis",
      name: "Macrocytosis",
      desc: "Larger than normal RBCs",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "wbc_morphology",
      name: "WBC Morphology",
      desc: "Assessment of white blood cell appearance",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal morphology",
          max: "Normal morphology",
        },
        female: {
          min: "Normal morphology",
          max: "Normal morphology",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "blast_cells",
      name: "Blast Cells",
      desc: "Immature precursor cells (important for leukemia detection)",
      unit: "%",
      dataType: "string",
      referenceRange: {
        male: {
          min: "0%",
          max: "0%",
        },
        female: {
          min: "0%",
          max: "0%",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "platelet_morphology",
      name: "Platelet Morphology",
      desc: "Size and appearance of platelets",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal size and distribution",
          max: "Normal size and distribution",
        },
        female: {
          min: "Normal size and distribution",
          max: "Normal size and distribution",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "platelet_clumps",
      name: "Platelet Clumping",
      desc: "Presence of platelet aggregation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Absent",
          max: "Absent",
        },
        female: {
          min: "Absent",
          max: "Absent",
        },
      },
      required: true,
      nullable: false,
    },
    {
      key: "malaria_parasite",
      name: "Malaria Parasite",
      desc: "Detection of Plasmodium species",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Not seen",
          max: "Not seen",
        },
        female: {
          min: "Not seen",
          max: "Not seen",
        },
      },
      required: false,
      nullable: true,
    },
    {
      key: "hemoparasites",
      name: "Other Hemoparasites",
      desc: "Detection of blood parasites",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Not seen",
          max: "Not seen",
        },
        female: {
          min: "Not seen",
          max: "Not seen",
        },
      },
      required: false,
      nullable: true,
    },
  ],
};
