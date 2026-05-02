import { BasePanelTest } from "@/lib/constants-types";

export interface CTScanTest extends BasePanelTest {}

export interface CTScanPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: CTScanTest[];
}

export const CT_SCAN_PANEL: CTScanPanel = {
  panelKey: "ct_scan",
  title: "CT Scan (Computed Tomography) Imaging Panel",
  clinicalCategory: "Radiology",
  specimenType: "Imaging",

  tests: [
    {
      key: "ct_image",
      name: "CT Scan Image",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No structural abnormality detected",
          max: "Abnormal findings present",
        },
        female: {
          min: "No structural abnormality detected",
          max: "Abnormal findings present",
        },
      },
      clinicalCategory: "Radiology",
      specimenType: "Cross-sectional Imaging",
      required: true,
      nullable: false,
      desc: "Raw CT scan imaging data",
    },

    {
      key: "brain_ct",
      name: "Brain CT Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal brain parenchyma",
          max: "Space-occupying lesion detected",
        },
        female: {
          min: "Normal brain parenchyma",
          max: "Space-occupying lesion detected",
        },
      },
      clinicalCategory: "Neurology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Evaluation of brain structures",
    },

    {
      key: "chest_ct",
      name: "Chest CT Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Clear lung fields",
          max: "Fibrotic lung changes",
        },
        female: {
          min: "Clear lung fields",
          max: "Fibrotic lung changes",
        },
      },
      clinicalCategory: "Pulmonology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Lung and mediastinum assessment",
    },

    {
      key: "abdomen_ct",
      name: "Abdominal CT Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal abdominal organs",
          max: "Calculi detected",
        },
        female: {
          min: "Normal abdominal organs",
          max: "Calculi detected",
        },
      },
      clinicalCategory: "Gastroenterology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Abdominal organ assessment",
    },

    {
      key: "bone_ct",
      name: "Bone/Spine CT Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal bony architecture",
          max: "Degenerative changes present",
        },
        female: {
          min: "Normal bony architecture",
          max: "Degenerative changes present",
        },
      },
      clinicalCategory: "Orthopedics",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Bone and spine evaluation",
    },

    {
      key: "contrast_enhancement",
      name: "Contrast Enhancement Pattern",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal enhancement pattern",
          max: "Abnormal enhancement detected",
        },
        female: {
          min: "Normal enhancement pattern",
          max: "Abnormal enhancement detected",
        },
      },
      clinicalCategory: "Radiology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Contrast uptake behavior",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant abnormality detected",
          max: "Findings require clinical correlation",
        },
        female: {
          min: "No significant abnormality detected",
          max: "Findings require clinical correlation",
        },
      },
      clinicalCategory: "Radiology Report",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall CT scan impression",
    },
  ],
};
