import { BasePanelTest } from "@/lib/constants-types";

export interface XRayTest extends BasePanelTest {}

export interface XRayPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: XRayTest[];
}

export const XRAY_PANEL: XRayPanel = {
  panelKey: "xray",
  title: "X-Ray Imaging Panel",
  clinicalCategory: "Radiology",
  specimenType: "Imaging",

  tests: [
    {
      key: "xray_image",
      name: "X-Ray Image",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No abnormal findings",
          max: "Pathological changes present",
        },
        female: {
          min: "No abnormal findings",
          max: "Pathological changes present",
        },
      },
      clinicalCategory: "Radiology",
      specimenType: "Digital Imaging",
      required: true,
      nullable: false,
      desc: "Radiographic image for bone and chest evaluation",
    },

    {
      key: "bone_fracture_detection",
      name: "Bone Fracture Detection",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No fracture detected",
          max: "Fracture detected",
        },
        female: {
          min: "No fracture detected",
          max: "Fracture detected",
        },
      },
      clinicalCategory: "Orthopedics",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Assessment of bone integrity",
    },

    {
      key: "lung_fields",
      name: "Lung Fields Assessment",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Clear lung fields",
          max: "Opacities / consolidation present",
        },
        female: {
          min: "Clear lung fields",
          max: "Opacities / consolidation present",
        },
      },
      clinicalCategory: "Pulmonology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Evaluation of lung parenchyma",
    },

    {
      key: "cardiac_silhouette",
      name: "Cardiac Silhouette",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "Normal heart size and shape",
          max: "Cardiomegaly suspected",
        },
        female: {
          min: "Normal heart size and shape",
          max: "Cardiomegaly suspected",
        },
      },
      clinicalCategory: "Cardiology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Heart size evaluation on chest X-ray",
    },

    {
      key: "pleural_effusion",
      name: "Pleural Effusion",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No effusion",
          max: "Pleural fluid detected",
        },
        female: {
          min: "No effusion",
          max: "Pleural fluid detected",
        },
      },
      clinicalCategory: "Pulmonology",
      specimenType: "Imaging Analysis",
      required: false,
      nullable: true,
      desc: "Fluid in pleural space assessment",
    },

    {
      key: "clinical_interpretation",
      name: "Clinical Interpretation",
      unit: null,
      dataType: "string",
      referenceRange: {
        male: {
          min: "No significant radiological abnormality",
          max: "Findings require clinical correlation",
        },
        female: {
          min: "No significant radiological abnormality",
          max: "Findings require clinical correlation",
        },
      },
      clinicalCategory: "Radiology Report",
      specimenType: "Calculated",
      required: false,
      nullable: true,
      desc: "Overall radiology impression",
    },
  ],
};
