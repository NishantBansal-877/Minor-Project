import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TEST_GROUPS } from "./constants-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const createPanelRegistry = () => {
  const registry: Record<string, Record<string, () => Promise<any>>> = {};

  for (const group of TEST_GROUPS) {
    const key = group.title.toLowerCase().replace(/\s+/g, "");

    registry[key] = {};

    for (const test of group.tests) {
      registry[key][test.id] = () => import(`@/data/tests/${key}/${test.id}`);
    }
  }

  return registry;
};

export const PANEL_REGISTRY = createPanelRegistry();

export const PANEL_GROUP_MAP: Record<string, string> = {
  fbs: "biochemistry",
  hba1c: "biochemistry",
  kft: "biochemistry",
  lft: "biochemistry",
  lipid: "biochemistry",
  rbs: "biochemistry",
  uric_acid: "biochemistry",
  aptt: "coagulation",
  d_dimer: "coagulation",
  pt: "coagulation",
  cbc: "hematology",
  esr: "hematology",
  peripheral_smear: "hematology",
  cortisol: "hormones",
  prolactin: "hormones",
  t3_t4: "hormones",
  testosterone: "hormones",
  tsh: "hormones",
  blood_culture: "microbiology",
  sputum_culture: "microbiology",
  stool_culture: "microbiology",
  urine_culture: "microbiology",
  ct: "radiology",
  xray: "radiology",
  ultrasound: "radiology",
  mri: "radiology",
  crp: "serology&immunology",
  dengue: "serology&immunology",
  widal: "serology&immunology",
  hiv: "serology&immunology",
  hbsag: "serology&immunology",
  hcv: "serology&immunology",
  ra_factor: "serology&immunology",
  occult_blood: "stooltests",
  stool_routine: "stooltests",
  stool_parasite: "stooltests",
  afp: "tumormarkers",
  ca125: "tumormarkers",
  ca19_9: "tumormarkers",
  cea: "tumormarkers",
  psa: "tumormarkers",
  microalbumin: "urinetests",
  urine_protein: "urinetests",
  urine_pregnancy: "urinetests",
  urine_routine: "urinetests",
};
