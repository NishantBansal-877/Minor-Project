import { BasePanelTest } from "@/lib/constants-types";

export interface USGTest extends BasePanelTest {}

export interface USGPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: USGTest[];
}

export const USG_PANEL: USGPanel = {
  panelKey: "ultrasound",
  title: "Ultrasound (USG) Imaging Panel",
  clinicalCategory: "Radiology",
  specimenType: "Imaging",

  tests: [
    {
      key: "usg_image",
      name: "Ultrasound Image",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal organ appearance",
          max: "Structural abnormality detected",
        },
        female: {
          min: "Normal organ appearance",
          max: "Structural abnormality detected",
        },
      },
      clinicalCategory: "Radiology",
      specimenType: "Imaging",
      required: true,
      nullable: false,
      desc: "Real-time ultrasound imaging of internal organs",
    },

    {
      key: "liver_usg",
      name: "Liver Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal liver echotexture",
          max: "Focal lesion detected",
        },
        female: {
          min: "Normal liver echotexture",
          max: "Focal lesion detected",
        },
      },
      clinicalCategory: "Hepatology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Assessment of liver parenchyma",
    },

    {
      key: "gallbladder_usg",
      name: "Gallbladder Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No stones or wall thickening",
          max: "Inflammatory wall thickening",
        },
        female: {
          min: "No stones or wall thickening",
          max: "Inflammatory wall thickening",
        },
      },
      clinicalCategory: "Gastroenterology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Gallbladder pathology assessment",
    },

    {
      key: "kidney_usg",
      name: "Kidney Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal kidney structure",
          max: "Renal cyst present",
        },
        female: {
          min: "Normal kidney structure",
          max: "Renal cyst present",
        },
      },
      clinicalCategory: "Nephrology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Kidney structure and pathology",
    },

    {
      key: "pelvic_usg",
      name: "Pelvic Organ Evaluation",
      unit: null,
      dataType: "string",
      referenceRange: {
        female: {
          min: "Normal pelvic organs",
          max: "Structural abnormality detected",
        },
      },
      clinicalCategory: "Gynecology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Female pelvic organ assessment",
    },

    {
      key: "abdominal_fluid",
      name: "Free Fluid Detection",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No free fluid",
          max: "Ascites / free fluid detected",
        },
        female: {
          min: "No free fluid",
          max: "Ascites / free fluid detected",
        },
      },
      clinicalCategory: "Radiology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Detection of intra-abdominal fluid",
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
      desc: "Overall ultrasound report impression",
    },
  ],
};
