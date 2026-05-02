import { BasePanelTest } from "@/lib/constants-types";

export interface MRITest extends BasePanelTest {}

export interface MRIPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: MRITest[];
}

export const MRI_SCAN_PANEL: MRIPanel = {
  panelKey: "mri_scan",
  title: "MRI (Magnetic Resonance Imaging) Panel",
  clinicalCategory: "Radiology / Diagnostic Imaging",
  specimenType: "Imaging",

  tests: [
    {
      key: "mri_image",
      name: "MRI Image Series",
      unit: null,
      dataType: "image",
      referenceRange: {
        male: {
          min: "No structural abnormality detected",
          max: "Pathological findings present",
        },
        female: {
          min: "No structural abnormality detected",
          max: "Pathological findings present",
        },
      },
      clinicalCategory: "Radiology",
      specimenType: "Imaging",
      required: true,
      nullable: false,
      desc: "High-resolution soft tissue imaging",
    },

    {
      key: "brain_mri",
      name: "Brain MRI Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal brain structures",
          max: "Mass lesion detected",
        },
        female: {
          min: "Normal brain structures",
          max: "Mass lesion detected",
        },
      },
      clinicalCategory: "Neurology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Assessment of brain pathology",
    },

    {
      key: "spine_mri",
      name: "Spine MRI Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal spinal cord and vertebrae",
          max: "Spinal mass detected",
        },
        female: {
          min: "Normal spinal cord and vertebrae",
          max: "Spinal mass detected",
        },
      },
      clinicalCategory: "Orthopedics / Neurology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Evaluation of spinal structures",
    },

    {
      key: "abdomen_mri",
      name: "Abdominal MRI Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal abdominal organs",
          max: "Inflammatory changes present",
        },
        female: {
          min: "Normal abdominal organs",
          max: "Inflammatory changes present",
        },
      },
      clinicalCategory: "Gastroenterology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Abdominal organ assessment",
    },

    {
      key: "soft_tissue_mri",
      name: "Soft Tissue MRI Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal soft tissue structures",
          max: "Soft tissue edema present",
        },
        female: {
          min: "Normal soft tissue structures",
          max: "Soft tissue edema present",
        },
      },
      clinicalCategory: "Radiology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Muscles and soft tissue evaluation",
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
      desc: "Gadolinium enhancement assessment",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "text",
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
      desc: "Overall MRI impression",
    },
  ],
};
