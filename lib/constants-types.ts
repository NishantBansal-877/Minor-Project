export type DataType =
  | "string"
  | "boolean"
  | "float"
  | "object"
  | "integer"
  | "text"
  | "image";

export interface NumericRange {
  min: number | string;
  max: number | string;
}

export interface ReferenceRange {
  normal?: NumericRange;
  low?: NumericRange;
  high?: NumericRange;

  male?: NumericRange;
  female?: NumericRange;
  child?: NumericRange;
  elderly?: NumericRange;

  morning?: NumericRange;
  evening?: NumericRange;

  suppressed?: NumericRange;
  elevated?: NumericRange;

  negative?: NumericRange;
  positive?: NumericRange;

  optimal?: NumericRange;
  borderline?: NumericRange;
  veryHigh?: NumericRange;

  protective?: NumericRange;
  ideal?: NumericRange;
  average?: NumericRange;
  highRisk?: NumericRange;

  // allow extensions safely
  [key: string]: NumericRange | undefined;
}

export interface BasePanelTest {
  key: string;
  name: string;
  desc?: string;
  unit: string | null;
  dataType: DataType;
  referenceRange: string | ReferenceRange;
  clinicalCategory: string;
  specimenType: string;
  required: boolean;
  nullable: boolean;
}

export const GENDER = ["male", "female", "other"] as const;

export type GenderType = (typeof GENDER)[number];

export const ROLE = ["lab", "patient", "doctor"] as const;

export type RoleType = (typeof ROLE)[number];

export const OTP_EXPIRY_TIME = 10 * 60 * 1000;

export const TEST_GROUPS = [
  {
    title: "Hematology",
    icon: "🩸",
    tests: [
      {
        id: "cbc",
        name: "Complete Blood Count (CBC)",
        desc: "Hb, WBC, RBC, Platelets",
      },
      { id: "esr", name: "ESR", desc: "Inflammation marker" },
      {
        id: "peripheral-smear",
        name: "Peripheral Smear",
        desc: "Blood cell morphology",
      },
    ],
  },
  {
    title: "Biochemistry",
    icon: "🧪",
    tests: [
      {
        id: "fbs",
        name: "Fasting Blood Sugar",
        desc: "Glucose level after fasting",
      },
      { id: "rbs", name: "Random Blood Sugar", desc: "Any-time glucose level" },
      { id: "hba1c", name: "HbA1c", desc: "3-month average glucose" },
      {
        id: "lft",
        name: "Liver Function Test (LFT)",
        desc: "AST, ALT, bilirubin, proteins",
      },
      {
        id: "kft",
        name: "Kidney Function Test (KFT)",
        desc: "Urea, creatinine, electrolytes",
      },
      { id: "lipid", name: "Lipid Profile", desc: "Cholesterol, HDL, LDL, TG" },
      { id: "uric-acid", name: "Uric Acid", desc: "Gout screening" },
    ],
  },
  {
    title: "Microbiology",
    icon: "🦠",
    tests: [
      {
        id: "blood-culture",
        name: "Blood Culture",
        desc: "Bacterial infection detection",
      },
      { id: "urine-culture", name: "Urine Culture", desc: "UTI detection" },
      {
        id: "sputum-culture",
        name: "Sputum Culture",
        desc: "Respiratory infection",
      },
      {
        id: "stool-culture",
        name: "Stool Culture",
        desc: "Gastrointestinal infection",
      },
    ],
  },
  {
    title: "Serology & Immunology",
    icon: "🧬",
    tests: [
      { id: "hiv", name: "HIV Test", desc: "HIV screening" },
      { id: "hbsag", name: "HBsAg", desc: "Hepatitis B screening" },
      { id: "hcv", name: "Hepatitis C (HCV)", desc: "Hepatitis C screening" },
      { id: "dengue", name: "Dengue Test", desc: "NS1 / antibody test" },
      { id: "widal", name: "Widal Test", desc: "Typhoid detection" },
      { id: "crp", name: "CRP", desc: "Inflammation marker" },
      {
        id: "ra-factor",
        name: "Rheumatoid Factor",
        desc: "Autoimmune arthritis",
      },
    ],
  },
  {
    title: "Urine Tests",
    icon: "🚻",
    tests: [
      {
        id: "urine-routine",
        name: "Urine Routine Examination",
        desc: "Physical & chemical analysis",
      },
      {
        id: "urine-protein",
        name: "Urine Protein",
        desc: "Protein leakage detection",
      },
      { id: "microalbumin", name: "Microalbumin", desc: "Early kidney damage" },
      {
        id: "urine-pregnancy",
        name: "Pregnancy Test (hCG)",
        desc: "Pregnancy detection",
      },
    ],
  },
  {
    title: "Stool Tests",
    icon: "💩",
    tests: [
      {
        id: "stool-routine",
        name: "Stool Routine",
        desc: "General stool examination",
      },
      {
        id: "occult-blood",
        name: "Occult Blood Test",
        desc: "Hidden blood detection",
      },
      {
        id: "stool-parasite",
        name: "Ova & Parasite",
        desc: "Worm infection detection",
      },
    ],
  },
  {
    title: "Hormones",
    icon: "🧠",
    tests: [
      { id: "tsh", name: "TSH", desc: "Thyroid function" },
      { id: "t3-t4", name: "T3/T4", desc: "Thyroid hormones" },
      { id: "cortisol", name: "Cortisol", desc: "Stress hormone" },
      { id: "prolactin", name: "Prolactin", desc: "Reproductive hormone" },
      { id: "testosterone", name: "Testosterone", desc: "Male hormone level" },
    ],
  },
  {
    title: "Coagulation",
    icon: "🩹",
    tests: [
      { id: "pt-inr", name: "PT/INR", desc: "Blood clotting time" },
      { id: "aptt", name: "APTT", desc: "Coagulation pathway" },
      { id: "d-dimer", name: "D-Dimer", desc: "Clot breakdown marker" },
    ],
  },
  {
    title: "Tumor Markers",
    icon: "🎗️",
    tests: [
      { id: "psa", name: "PSA", desc: "Prostate cancer marker" },
      { id: "afp", name: "AFP", desc: "Liver cancer marker" },
      { id: "cea", name: "CEA", desc: "General cancer marker" },
      { id: "ca125", name: "CA-125", desc: "Ovarian cancer marker" },
      { id: "ca19-9", name: "CA 19-9", desc: "Pancreatic cancer marker" },
    ],
  },
  {
    title: "Radiology",
    icon: "🧠",
    tests: [
      { id: "xray", name: "X-Ray", desc: "Bones & chest imaging" },
      {
        id: "ultrasound",
        name: "Ultrasound (USG)",
        desc: "Internal organ imaging",
      },
      { id: "ct", name: "CT Scan", desc: "Cross-sectional imaging" },
      { id: "mri", name: "MRI Scan", desc: "Soft tissue imaging" },
    ],
  },
];
