"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { PANEL_REGISTRY } from "@/lib/utils";
import { savePanelDetails } from "@/features/db/admin-queries";

import { toast } from "sonner";

import DocumentPreview from "@/components/document-preview";

import Tesseract from "tesseract.js";

import { extractLabValues } from "@/lib/ocr-parser";

type FormValues = Record<string, string | undefined>;

interface TestType {
  id: string;
  desc: string;
  name: string;
}

interface TestGroupType {
  title: string;
  icon: string;
  tests: TestType[];
}

interface PanelResultType {
  panelKey: string;
  values: FormValues;
  panelTitle: string;
  clinicalCategory?: string;
  specimenType?: string;
}

interface PanelTestType {
  key: string;
  name: string;
  desc?: string;
  unit?: string;
  required?: boolean;
  referenceRange?: any;
  defaultValue?: string;
  value?: string;
}

interface CurrentPanelType {
  panelKey: string;
  title: string;
  clinicalCategory?: string;
  specimenType?: string;
  tests: PanelTestType[];
}

export default function FillTestsStepperPage() {
  const router = useRouter();

  const [step, setStep] = useState<number>(0);

  const [results, setResults] = useState<PanelResultType[]>([]);

  const [currentPanel, setCurrentPanel] = useState<CurrentPanelType | null>(
    null,
  );

  const [uploadedFiles, setUploadedFiles] = useState<
    Record<number, File | null>
  >({});

  const [ocrLoading, setOcrLoading] = useState<boolean>(false);

  const selectedUser = useSelector((state: any) => state.user.selectedUser);

  const labId = useSelector((state: any) => state.user.user.userId);

  const selectedTestGroups = useSelector(
    (state: any) => state.lab.selectedTests,
  ) as TestGroupType[];

  const userGender = selectedUser?.gender?.toLowerCase?.() || "male";

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    shouldUnregister: false,
  });

  const values = watch();

  /* =========================================================
     GROUP PANELS
  ========================================================= */

  const groupedPanels = useMemo(() => {
    return (selectedTestGroups || []).flatMap((g) =>
      (g.tests || []).map((t) => ({
        title: g.title,
        data: {
          id: t.id,
          name: t.name,
          desc: t.desc,
        },
      })),
    );
  }, [selectedTestGroups]);

  const totalSteps = groupedPanels.length;

  const currentStepData = groupedPanels?.[step];

  /* =========================================================
     HELPERS
  ========================================================= */

  const isEmpty = (v: any) => v === undefined || v === null || v === "";

  const buildDefaultValues = (panel: CurrentPanelType): FormValues => {
    if (!panel?.tests) return {};

    return panel.tests.reduce(
      (acc: Record<string, string | undefined>, test: PanelTestType) => {
        acc[test.key] = test.defaultValue ?? test.value ?? "";

        return acc;
      },
      {},
    );
  };

  /* =========================================================
     LOAD PANEL
  ========================================================= */

  useEffect(() => {
    setCurrentPanel(null);

    if (!currentStepData) return;

    const load = async () => {
      try {
        const groupKey = currentStepData.title
          ?.toLowerCase()
          ?.replace(/\s+/g, "");

        const testKey = currentStepData.data?.id?.toLowerCase()?.trim();

        if (!PANEL_REGISTRY[groupKey]) {
          console.error("Group not found:", groupKey);
          return;
        }

        if (!PANEL_REGISTRY[groupKey][testKey]) {
          console.error("Test not found:", testKey);
          return;
        }

        const importer = PANEL_REGISTRY[groupKey][testKey];

        const module = await importer();

        if (!module) return;

        const panel = Object.values(module)[0] as CurrentPanelType;

        setCurrentPanel(panel);

        const existingValues = results?.[step]?.values;

        reset(existingValues || buildDefaultValues(panel));
      } catch (err) {
        console.error("Failed loading panel:", err);
      }
    };

    load();
  }, [step, currentStepData, reset, results]);

  /* =========================================================
     OCR PROCESSING
  ========================================================= */

  const processUploadedFile = async (file: File) => {
    if (!currentPanel) return;

    setOcrLoading(true);

    try {
      let imageSource = "";

      /*
      ========================================
      IMAGE FILE
      ========================================
      */

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        imageSource = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);

          reader.onerror = reject;

          reader.readAsDataURL(file);
        });
      } else if (file.type === "application/pdf") {
        /*
        ========================================
        PDF FILE
        ========================================
        */

        const pdfjsLib = await import("pdfjs-dist");

        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const pdfData = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
          data: pdfData,
        }).promise;

        /*
        ========================================
        FIRST PAGE
        ========================================
        */

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({
          scale: 2,
        });

        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        if (!context) {
          toast.error("Canvas error");

          setOcrLoading(false);

          return;
        }

        canvas.width = viewport.width;

        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
          canvas,
        }).promise;

        imageSource = canvas.toDataURL("image/png");
      } else {
        toast.error("Unsupported file type");

        setOcrLoading(false);

        return;
      }

      /*
      ========================================
      OCR
      ========================================
      */

      const result = await Tesseract.recognize(imageSource, "eng", {
        logger: (m) => console.log(m),
      });

      const text = result.data.text;

      console.log("OCR TEXT:", text);

      /*
      ========================================
      EXTRACT VALUES
      ========================================
      */

      const extracted = extractLabValues(text, currentPanel.tests);

      console.log(extracted);

      reset({
        ...watch(),
        ...extracted,
      });

      toast.success("Values extracted successfully");
    } catch (err) {
      console.error(err);

      toast.error("OCR failed");
    }

    setOcrLoading(false);
  };

  /* =========================================================
     RANGE PARSER
  ========================================================= */

  const parseRange = (range: any, gender = "male") => {
    if (!range) return null;

    let selected = range;

    if (typeof range === "object" && !("min" in range)) {
      selected =
        range?.[gender] || range?.male || range?.female || range?.normal;
    }

    if (!selected) return null;

    if (
      typeof selected === "object" &&
      "min" in selected &&
      "max" in selected
    ) {
      return selected;
    }

    if (typeof selected === "string") {
      const normalized = selected.replace(/-/g, "–");

      const parts = normalized.split("–").map((v) => v.trim());

      if (parts.length === 2) {
        const min = Number(parts[0]);

        const max = Number(parts[1]);

        if (!isNaN(min) && !isNaN(max)) {
          return { min, max };
        }
      }

      return {
        min: selected,
        max: selected,
      };
    }

    return null;
  };

  const isNumericRange = (range: any) => {
    return (
      range && typeof range.min === "number" && typeof range.max === "number"
    );
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatus = (value: any, range: any) => {
    if (!range || isEmpty(value)) {
      return null;
    }

    if (isNumericRange(range)) {
      const num = Number(value);

      if (Number.isNaN(num)) {
        return "INVALID";
      }

      if (num < range.min) {
        return "LOW";
      }

      if (num > range.max) {
        return "HIGH";
      }

      return "NORMAL";
    }

    const expected = String(range.min).trim().toLowerCase();

    const actual = String(value).trim().toLowerCase();

    return expected === actual ? "NORMAL" : "ABNORMAL";
  };

  /* =========================================================
     ERROR MESSAGE
  ========================================================= */

  const getErrorMessage = (value: any, range: any) => {
    if (!range || isEmpty(value)) {
      return undefined;
    }

    if (isNumericRange(range)) {
      const num = Number(value);

      if (Number.isNaN(num)) {
        return "Invalid number";
      }

      if (num < range.min) {
        return `Below normal (${range.min})`;
      }

      if (num > range.max) {
        return `Above normal (${range.max})`;
      }

      return undefined;
    }

    const expected = String(range.min).trim().toLowerCase();

    const actual = String(value).trim().toLowerCase();

    if (expected !== actual) {
      return `Expected: ${range.min}`;
    }

    return undefined;
  };

  /* =========================================================
     FORMAT REFERENCE
  ========================================================= */

  const formatRef = (ref: any) => {
    if (!ref) return "-";

    if (typeof ref === "string") {
      return ref;
    }

    const selected =
      ref?.[userGender] || ref?.male || ref?.female || ref?.normal;

    if (!selected) return "-";

    if (typeof selected.min === "number" && typeof selected.max === "number") {
      if (selected.min === selected.max) {
        return `${selected.min} (${userGender})`;
      }

      return `${selected.min} – ${selected.max} (${userGender})`;
    }

    if (selected.min === selected.max) {
      return `${selected.min}`;
    }

    return `${selected.min} – ${selected.max}`;
  };

  /* =========================================================
     SAVE STEP
  ========================================================= */

  const saveCurrentStepValues = (data: FormValues) => {
    if (!currentPanel) return;

    setResults((prev) => {
      const updated = [...prev];

      updated[step] = {
        panelKey: currentPanel.panelKey,
        values: data,
        panelTitle: currentPanel.title,
        clinicalCategory: currentPanel.clinicalCategory,
        specimenType: currentPanel.specimenType,
      };

      return updated;
    });
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit = async (data: FormValues) => {
    if (!currentPanel) return;

    const panelData: PanelResultType = {
      panelKey: currentPanel.panelKey,
      values: data,
      panelTitle: currentPanel.title,
      clinicalCategory: currentPanel.clinicalCategory,
      specimenType: currentPanel.specimenType,
    };

    saveCurrentStepValues(data);

    if (step < totalSteps - 1) {
      setStep((s) => s + 1);

      return;
    }

    const finalResults = [...results];

    finalResults[step] = panelData;

    const patientId = selectedUser.userId;

    const res = await savePanelDetails(finalResults, labId, patientId);

    if (res?.status === "SUCCESS") {
      toast.success(res.message);

      router.replace("/admin/dashboard");
    } else {
      toast.error(res?.message || "Something went wrong");
    }
  };

  const progress = totalSteps ? ((step + 1) / totalSteps) * 100 : 0;

  /* =========================================================
     LOADING
  ========================================================= */

  if (!currentPanel || !currentStepData) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <main className="max-w-5xl mx-auto w-full px-6 py-8">
        {/* HEADER */}

        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{currentPanel.title}</h1>

            <p className="text-sm text-gray-400">
              {currentPanel.clinicalCategory} • {currentPanel.specimenType}
            </p>

            <p className="text-xs text-gray-500">
              Step {step + 1} / {totalSteps}
            </p>
          </div>

          <Link href={`/admin/upload/tests/?patient=${selectedUser.userId}`}>
            <Button variant="outline" className="bg-white/10">
              ← Back
            </Button>
          </Link>
        </div>

        {/* PROGRESS */}

        <Progress value={progress} className="mb-6" />

        <div className="gap-6 mb-8">
          <div className="bg-white/5 border-white/10 rounded-xl p-4 flex items-center justify-center w-full">
            <DocumentPreview
              file={uploadedFiles[step] || null}
              onFileSelect={(file: File) => {
                setUploadedFiles((prev) => ({
                  ...prev,
                  [step]: file,
                }));

                processUploadedFile(file);
              }}
            />
          </div>

          {ocrLoading && (
            <p className="text-sm text-gray-400 mt-2">Processing OCR...</p>
          )}
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {currentPanel.tests.map((test: PanelTestType) => {
              const value = values[test.key];

              const range = parseRange(test.referenceRange, userGender);

              const status = !isEmpty(value) ? getStatus(value, range) : null;

              const errorMsg = !isEmpty(value)
                ? getErrorMessage(value, range)
                : undefined;

              const rhfError = errors[test.key]?.message;

              let border = "border-white/10";

              if (rhfError) {
                border = "border-red-500";
              } else if (status === "HIGH" || status === "ABNORMAL") {
                border = "border-red-400";
              } else if (status === "LOW") {
                border = "border-yellow-400";
              } else if (status === "NORMAL") {
                border = "border-emerald-500";
              }

              return (
                <Card key={test.key} className={`bg-white/5 ${border}`}>
                  <CardContent className="p-4 space-y-2">
                    {/* HEADER */}

                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white">
                        {test.name}
                      </h3>

                      {test.required && (
                        <span className="text-xs text-red-400">Required</span>
                      )}
                    </div>

                    {/* DESC */}

                    <p className="text-xs text-gray-400 line-clamp-1">
                      {test.desc}
                    </p>

                    {/* INPUT */}

                    <Controller
                      name={test.key}
                      control={control}
                      rules={{
                        required: test.required ? "Required field" : false,

                        validate: (val) => {
                          if (isEmpty(val)) {
                            return test.required ? "Required field" : true;
                          }

                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          type="text"
                          inputMode="decimal"
                          className="bg-white/5 text-white border-white/10 h-11"
                        />
                      )}
                    />

                    {/* REFERENCE */}

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatRef(test.referenceRange)}</span>

                      <span>{test.unit}</span>
                    </div>

                    {/* ERRORS */}

                    {rhfError && (
                      <p className="text-xs text-red-400">{String(rhfError)}</p>
                    )}

                    {!rhfError && errorMsg && (
                      <p
                        className={`text-xs ${
                          status === "LOW"
                            ? "text-yellow-400"
                            : status === "NORMAL"
                              ? "text-emerald-400"
                              : "text-red-400"
                        }`}
                      >
                        {errorMsg}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* ACTIONS */}

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={() => {
                saveCurrentStepValues(watch());

                setStep((s) => Math.max(0, s - 1));
              }}
              variant="outline"
              className="bg-white/10"
            >
              ← Previous
            </Button>

            <Button type="submit" className="text-black bg-emerald-500">
              {step === totalSteps - 1 ? "Submit" : "Next →"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
