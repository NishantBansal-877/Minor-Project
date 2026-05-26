"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getReportDetail, updateReport } from "@/features/db/admin-queries";
import { PANEL_REGISTRY } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Report = any;

export default function SingleReportPage() {
  const { reportId } = useParams<{ reportId: string }>();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({});
  const [panel, setPanel] = useState<any>(null);

  const router = useRouter();

  /* ================= LOAD REPORT ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getReportDetail(Number(reportId));
        console.log(data);
        setReport(data);
        setValues(data?.values || {});
      } finally {
        setLoading(false);
      }
    };

    if (reportId) load();
  }, [reportId]);

  /* ================= LOAD PANEL ================= */
  useEffect(() => {
    const loadPanel = async () => {
      if (!report) return;

      try {
        const groupKey = report.clinicalCategory
          ?.toLowerCase()
          .replace(/\s+/g, "")
          .split("/")[0];

        const testKey = report.panelKey.replaceAll("_", "-");
        console.log(groupKey);
        console.log(testKey);
        const importer = PANEL_REGISTRY?.[groupKey]?.[testKey];

        if (!importer) return;

        const module = await importer();

        const panelDef = Object.values(module)[0];

        setPanel(panelDef);
      } catch (err) {
        console.error("Panel load error:", err);
      }
    };

    loadPanel();
  }, [report]);

  /* ================= HELPERS ================= */
  const parseRange = (range: any, gender = "male") => {
    if (!range) return null;

    // ==========================================
    // STRING RANGE
    // ==========================================

    if (typeof range === "string") {
      return range;
    }

    // ==========================================
    // GENDER BASED RANGE
    // ==========================================

    if (range.male || range.female) {
      return {
        type: "gender",
        male: range.male,
        female: range.female,
        selected: gender.toLowerCase() === "female" ? range.female : range.male,
      };
    }

    // ==========================================
    // NORMAL RANGE
    // ==========================================

    if (typeof range.min !== "undefined" && typeof range.max !== "undefined") {
      return {
        type: "normal",
        min: range.min,
        max: range.max,
      };
    }

    return null;
  };

  const getStatus = (value: any, parsedRange: any) => {
    if (!parsedRange) return null;

    const num = Number(value);

    if (Number.isNaN(num)) {
      return "INVALID";
    }

    let range = null;

    if (parsedRange.type === "gender") {
      range = parsedRange.selected;
    }

    if (parsedRange.type === "normal") {
      range = parsedRange;
    }

    if (!range) return null;

    if (num < range.min) return "LOW";

    if (num > range.max) return "HIGH";

    return "NORMAL";
  };

  const formatReference = (parsedRange: any) => {
    if (!parsedRange) {
      return "-";
    }

    // ==========================================
    // STRING
    // ==========================================

    if (typeof parsedRange === "string") {
      return parsedRange;
    }

    // ==========================================
    // GENDER
    // ==========================================

    if (parsedRange.type === "gender") {
      const male = parsedRange.male
        ? parsedRange.male.min === parsedRange.male.max
          ? `${parsedRange.male.min} (M)`
          : `${parsedRange.male.min} - ${parsedRange.male.max} (M)`
        : null;

      const female = parsedRange.female
        ? parsedRange.female.min === parsedRange.female.max
          ? `${parsedRange.female.min} (F)`
          : `${parsedRange.female.min} - ${parsedRange.female.max} (F)`
        : null;

      return [male, female].filter(Boolean).join(" / ");
    }

    // ==========================================
    // NORMAL
    // ==========================================

    if (parsedRange.type === "normal") {
      return `${parsedRange.min} - ${parsedRange.max}`;
    }

    return "-";
  };

  const getStyle = (status: string | null) => {
    switch (status) {
      case "LOW":
        return "border-yellow-500 text-yellow-400";
      case "HIGH":
        return "border-red-500 text-red-400";
      case "NORMAL":
        return "border-emerald-500 text-emerald-400";
      default:
        return "border-white/10 text-gray-300";
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return <div className="text-white p-6">Loading report...</div>;
  }
  console.log("report", report);
  console.log("report panel", panel);
  if (!report || !panel) {
    return <div className="text-white p-6">Report not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("UPDATED VALUES:", values);

    const res = await updateReport(report.id, values);

    if (res.status === "SUCCESS") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setEditMode(false);
  };

  // ======================================================
  // FRONTEND DOWNLOAD FUNCTION
  // ======================================================
  const downloadPDF = async (reportId: string) => {
    try {
      const response = await fetch(`/api/pdf/${reportId}`);

      if (!response.ok) {
        throw new Error("Failed");
      }

      /*
     =========================================
     GET FILENAME FROM HEADERS
     =========================================
    */

      const disposition = response.headers.get("Content-Disposition");

      let filename = `report_${reportId}.pdf`;

      if (disposition) {
        /*
       =========================================
       filename*=UTF-8''
       =========================================
      */

        const utf8Match = disposition.match(/filename\*=UTF-8''(.+)/);

        if (utf8Match?.[1]) {
          filename = decodeURIComponent(utf8Match[1]);
        } else {
          /*
         =========================================
         fallback filename=""
         =========================================
        */

          const normalMatch = disposition.match(/filename="(.+)"/);

          if (normalMatch?.[1]) {
            filename = normalMatch[1];
          }
        }
      }

      /*
     =========================================
     BLOB
     =========================================
    */

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      /*
     =========================================
     DOWNLOAD
     =========================================
    */

      const a = document.createElement("a");

      a.href = url;

      a.download = filename;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded");
    } catch (error) {
      console.error(error);

      toast.error("PDF download failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* FORM WRAP */}
        <form onSubmit={handleSubmit}>
          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">{report.panelTitle}</h1>
              <p className="text-sm text-gray-400">
                {report.clinicalCategory} • {report.specimenType}
              </p>
              <p className="text-white/80 text-sm">
                PatientID:{" "}
                <span className="text-white/70">{report.patientId}</span>
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setEditMode((p) => !p)}
                  className="bg-white/10 text-white"
                >
                  {editMode ? "Cancel" : "Edit Report"}
                </Button>

                <Button
                  type="button"
                  className="bg-white/10 text-white"
                  onClick={() => downloadPDF(report.id)}
                >
                  Download PDF
                </Button>

                {editMode && (
                  <Button type="submit" className="bg-emerald-500 text-black">
                    Save
                  </Button>
                )}
              </div>
              <Button className="bg-white/10" onClick={() => router.back()}>
                ← Back
              </Button>
            </div>
          </div>

          {/* TEST GRID */}
          <div className="grid md:grid-cols-2 gap-4">
            {panel.tests.map((test: any) => {
              const value = values?.[test.key];
              const range = parseRange(
                test.referenceRange,
                report.gender || "male",
              );

              const status = getStatus(value, range);

              return (
                <Card
                  key={test.key}
                  className={`bg-white/5 border ${getStyle(status)}`}
                >
                  <CardContent className="p-4 space-y-2">
                    {/* NAME */}
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{test.name}</h3>
                      <span className="text-xs">{status}</span>
                    </div>

                    {/* VALUE */}
                    {editMode ? (
                      <Input
                        value={values[test.key] ?? ""}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            [test.key]: e.target.value,
                          }))
                        }
                        className="bg-white/5 border-white/10"
                      />
                    ) : (
                      <p className="text-lg">{String(value ?? "-")}</p>
                    )}

                    {/* RANGE */}
                    <div className="text-xs text-gray-400">
                      <span className="text-gray-500">Reference:</span>{" "}
                      {formatReference(range)}
                    </div>

                    {/* STATUS */}
                    {status === "LOW" && (
                      <p className="text-xs text-yellow-400">
                        Below reference range
                      </p>
                    )}

                    {status === "HIGH" && (
                      <p className="text-xs text-red-400">
                        Above reference range
                      </p>
                    )}

                    {status === "INVALID" && (
                      <p className="text-xs text-red-400">Invalid value</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}
