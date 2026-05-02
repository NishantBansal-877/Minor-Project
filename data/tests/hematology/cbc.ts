import { BasePanelTest, ReferenceRange } from "@/lib/constants-types";

export interface CBCTest extends BasePanelTest {
  referenceRange: string | ReferenceRange;
}

export interface CBCPanel {
  panelKey: string;
  title: string;
  clinicalCategory: string;
  specimenType: string;
  tests: CBCTest[];
}

export const CBC: CBCPanel = {
  panelKey: "cbc",
  title: "Complete Blood Count (CBC)",
  clinicalCategory: "Hematology",
  specimenType: "EDTA Whole Blood",

  tests: [
    {
      key: "hb",
      name: "Hemoglobin",
      unit: "g/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 13.5, max: 17.5 },
        female: { min: 12.0, max: 15.5 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Oxygen-carrying protein in red blood cells",
    },
    {
      key: "rbc",
      name: "Red Blood Cell Count",
      unit: "million/µL",
      dataType: "float",
      referenceRange: {
        male: { min: 4.7, max: 6.1 },
        female: { min: 4.2, max: 5.4 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Measures the number of red blood cells in blood",
    },
    {
      key: "wbc",
      name: "White Blood Cell Count",
      unit: "cells/µL",
      dataType: "float",
      referenceRange: {
        male: { min: 4000, max: 11000 },
        female: { min: 4000, max: 11000 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Measures immune cells responsible for fighting infection",
    },
    {
      key: "platelets",
      name: "Platelet Count",
      unit: "cells/µL",
      dataType: "float",
      referenceRange: {
        male: { min: 150000, max: 450000 },
        female: { min: 150000, max: 450000 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Measures platelets involved in blood clotting",
    },
    {
      key: "hematocrit",
      name: "Hematocrit (PCV)",
      unit: "%",
      dataType: "float",
      referenceRange: {
        male: { min: 40, max: 52 },
        female: { min: 36, max: 48 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Percentage of blood volume occupied by red blood cells",
    },
    {
      key: "mcv",
      name: "Mean Corpuscular Volume",
      unit: "fL",
      dataType: "float",
      referenceRange: {
        male: { min: 80, max: 100 },
        female: { min: 80, max: 100 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Average size of individual red blood cells",
    },
    {
      key: "mch",
      name: "Mean Corpuscular Hemoglobin",
      unit: "pg",
      dataType: "float",
      referenceRange: {
        male: { min: 27, max: 33 },
        female: { min: 27, max: 33 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Average amount of hemoglobin per red blood cell",
    },
    {
      key: "mchc",
      name: "Mean Corpuscular Hemoglobin Concentration",
      unit: "g/dL",
      dataType: "float",
      referenceRange: {
        male: { min: 32, max: 36 },
        female: { min: 32, max: 36 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Average concentration of hemoglobin in red blood cells",
    },
    {
      key: "rdw",
      name: "Red Cell Distribution Width",
      unit: "%",
      dataType: "float",
      referenceRange: {
        male: { min: 11.5, max: 14.5 },
        female: { min: 11.5, max: 14.5 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Measures variation in size of red blood cells",
    },
    {
      key: "wbc_diff",
      name: "WBC Differential Count",
      unit: "%",
      dataType: "object",
      referenceRange: {
        neutrophils: { min: 40, max: 75 },
        lymphocytes: { min: 20, max: 45 },
        monocytes: { min: 2, max: 10 },
        eosinophils: { min: 1, max: 6 },
        basophils: { min: 0, max: 1 },
      },
      clinicalCategory: "Hematology",
      specimenType: "EDTA Whole Blood",
      required: true,
      nullable: false,
      desc: "Breakdown of different types of white blood cells",
    },
  ],
};
