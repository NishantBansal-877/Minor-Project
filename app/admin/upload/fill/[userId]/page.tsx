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

/* =========================================================
   TYPES
========================================================= */

type FormValues = Record<string, string | undefined>;

type TestGroupType = {
  title: string;
  icon: string;

  tests: {
    id: string;
    desc: string;
    name: string;
  }[];
};

type PanelResultType = {
  panelKey: string;

  values: FormValues;

  labId: string;

  panelTitle: string;

  patientId: string;

  clinicalCategory?: string;

  specimenType?: string;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function FillTestsStepperPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);

  const [results, setResults] = useState<PanelResultType[]>([]);

  const [currentPanel, setCurrentPanel] = useState<any>(null);

  /* =========================================================
     REDUX
  ========================================================= */

  const user = useSelector((state: any) => state.user.user);

  const selectedUser = useSelector((state: any) => state.user.selectedUser);

  const selectedTestGroups = useSelector(
    (state: any) => state.lab.selectedTests,
  ) as TestGroupType[];

  const userGender = selectedUser?.gender?.toLowerCase?.() || "male";

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
     RHF
  ========================================================= */

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
     HELPERS
  ========================================================= */

  const isEmpty = (v: any) => v === undefined || v === null || v === "";

  /* =========================================================
     BUILD DEFAULT VALUES
  ========================================================= */

  const buildDefaultValues = (panel: any): FormValues => {
    if (!panel?.tests) return {};

    return panel.tests.reduce(
      (acc: Record<string, string | undefined>, test: any) => {
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
        console.log("currentStepData:", currentStepData);

        const groupKey = currentStepData.title
          ?.toLowerCase()
          ?.replace(/\s+/g, "");

        const testKey = currentStepData.data?.id?.toLowerCase()?.trim();

        console.log("groupKey:", groupKey);
        console.log("testKey:", testKey);

        console.log("PANEL_REGISTRY:", PANEL_REGISTRY);

        // check existence
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

        console.log("Loaded module:", module);

        if (!module) return;

        const panel = Object.values(module)[0];

        setCurrentPanel(() => panel);

        /* =====================================
         RESTORE PREVIOUS VALUES
      ===================================== */

        const existingValues = results?.[step]?.values;

        reset(existingValues || buildDefaultValues(panel));
      } catch (err) {
        console.error("Failed loading panel:", err);
      }
    };

    load();
  }, [step, currentStepData, reset, results]);

  /* =========================================================
     RANGE ENGINE
  ========================================================= */

  const parseRange = (range: any, gender = "male") => {
    if (!range) return null;

    let selected = range;

    /* =====================================
       GENDER RANGE
    ===================================== */

    if (typeof range === "object" && !("min" in range)) {
      selected =
        range?.[gender] || range?.male || range?.female || range?.normal;
    }

    if (!selected) return null;

    /* =====================================
       OBJECT RANGE
    ===================================== */

    if (
      typeof selected === "object" &&
      "min" in selected &&
      "max" in selected
    ) {
      return selected;
    }

    /* =====================================
       STRING RANGE
       Example: "12–16"
    ===================================== */

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

      /* =====================================
         EXACT STRING MATCH
      ===================================== */

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

  const getStatus = (value: any, range: any) => {
    if (!range || isEmpty(value)) {
      return null;
    }

    /* =====================================
       NUMERIC
    ===================================== */

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

    /* =====================================
       STRING MATCH
    ===================================== */

    const expected = String(range.min).trim().toLowerCase();

    const actual = String(value).trim().toLowerCase();

    return expected === actual ? "NORMAL" : "ABNORMAL";
  };

  const getErrorMessage = (value: any, range: any) => {
    if (!range || isEmpty(value)) {
      return undefined;
    }

    /* =====================================
       NUMERIC
    ===================================== */

    if (isNumericRange(range)) {
      const num = Number(value);

      if (Number.isNaN(num)) {
        return "Invalid number";
      }

      if (num < range.min) {
        return "Below normal range";
      }

      if (num > range.max) {
        return "Above normal range";
      }

      return undefined;
    }

    /* =====================================
       STRING MATCH
    ===================================== */

    const expected = String(range.min).trim();

    const actual = String(value).trim();

    if (expected.toLowerCase() !== actual.toLowerCase()) {
      return `Expected: ${expected}`;
    }

    return undefined;
  };

  const formatRef = (ref: any) => {
    if (!ref) return "-";

    if (typeof ref === "string") {
      return ref;
    }

    const selected =
      ref?.[userGender] || ref?.male || ref?.female || ref?.normal;

    if (!selected) return "-";

    /* =====================================
       NUMERIC RANGE
    ===================================== */

    if (typeof selected.min === "number" && typeof selected.max === "number") {
      return `${selected.min}–${selected.max} (${userGender})`;
    }

    /* =====================================
       SAME STRING
    ===================================== */

    if (selected.min === selected.max) {
      return `${selected.min}`;
    }

    return `${selected.min} – ${selected.max}`;
  };

  /* =========================================================
     ABNORMAL CHECK
  ========================================================= */

  const hasAbnormal =
    currentPanel?.tests?.some((test: any) => {
      const val = values?.[test.key];

      if (isEmpty(val)) {
        return false;
      }

      const range = parseRange(test.referenceRange, userGender);

      if (!range) return false;

      const status = getStatus(val, range);

      return status === "LOW" || status === "HIGH" || status === "ABNORMAL";
    }) || false;

  /* =========================================================
     SAVE STEP VALUES
  ========================================================= */

  const saveCurrentStepValues = (data: FormValues) => {
    setResults((prev) => {
      const updated = [...prev];

      updated[step] = {
        panelKey: currentPanel.panelKey,

        values: data,

        labId: user.userId,

        panelTitle: currentPanel.title,

        patientId: selectedUser.userId,

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
    const panelData: PanelResultType = {
      panelKey: currentPanel.panelKey,

      values: data,

      labId: user.userId,

      panelTitle: currentPanel.title,

      patientId: selectedUser.userId,

      clinicalCategory: currentPanel.clinicalCategory,

      specimenType: currentPanel.specimenType,
    };

    saveCurrentStepValues(data);

    /* =====================================
       NEXT STEP
    ===================================== */

    if (step < totalSteps - 1) {
      setStep((s) => s + 1);

      return;
    }

    /* =====================================
       FINAL SUBMIT
    ===================================== */

    const finalResults = [...results];

    finalResults[step] = panelData;

    console.log("FINAL RESULT:", finalResults);

    const res = await savePanelDetails(finalResults);

    if (res?.status === "SUCCESS") {
      toast.success(res.message);

      router.replace("/admin/dashboard");
    } else {
      toast.error(res?.message || "Something went wrong");
    }
  };

  /* =========================================================
     PROGRESS
  ========================================================= */

  const progress = totalSteps ? ((step + 1) / totalSteps) * 100 : 0;

  /* =========================================================
     LOADING
  ========================================================= */

  if (!currentPanel || !currentStepData) {
    return <div className="text-white p-6">Loading...</div>;
  }

  /* =========================================================
     UI
  ========================================================= */

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

        {/* FORM */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {currentPanel.tests.map((test: any) => {
              const value = values[test.key];

              const range = parseRange(test.referenceRange, userGender);

              const status = !isEmpty(value) ? getStatus(value, range) : null;

              const errorMsg = !isEmpty(value)
                ? getErrorMessage(value, range)
                : undefined;

              const rhfError = errors[test.key]?.message;

              let border = "border-white/10";

              if (rhfError || errorMsg) {
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
                          /* EMPTY */

                          if (isEmpty(val)) {
                            return test.required ? "Required field" : true;
                          }

                          const range = parseRange(
                            test.referenceRange,
                            userGender,
                          );

                          if (!range) {
                            return true;
                          }

                          /* NUMERIC */

                          if (isNumericRange(range)) {
                            const num = Number(val);

                            // allow submit even if invalid
                            if (Number.isNaN(num)) {
                              return true;
                            }

                            if (num < range.min) {
                              return true;
                            }

                            if (num > range.max) {
                              return true;
                            }

                            return true;
                          }

                          /* STRING */

                          const expected = String(range.min)
                            .trim()
                            .toLowerCase();

                          const actual = String(val).trim().toLowerCase();

                          // allow submit even if mismatch
                          if (expected !== actual) {
                            return true;
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

                    {/* ERROR */}

                    {(rhfError || errorMsg) && (
                      <p className="text-xs text-red-400">
                        {String(rhfError || errorMsg)}
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

            <Button type="submit" className={`text-black bg-emerald-500`}>
              {step === totalSteps - 1 ? "Submit" : "Next →"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
