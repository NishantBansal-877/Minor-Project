"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { getReportDetail } from "@/features/db/admin-queries";

import { PANEL_REGISTRY } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { toast } from "sonner";

type Report = any;

export default function SingleReportPage() {
  const { reportId } = useParams<{ reportId: string }>();

  const router = useRouter();

  const [report, setReport] = useState<Report | null>(null);

  const [panel, setPanel] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  // ======================================================
  // LOAD REPORT
  // ======================================================

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getReportDetail(Number(reportId));
        console.log(data);
        setReport(data);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      load();
    }
  }, [reportId]);

  // ======================================================
  // LOAD PANEL
  // ======================================================

  useEffect(() => {
    const loadPanel = async () => {
      if (!report) return;

      try {
        const groupKey = report.clinicalCategory
          ?.toLowerCase()
          .replace(/\s+/g, "");

        const testKey = report.panelKey.replaceAll("_", "-");

        const importer = PANEL_REGISTRY?.[groupKey]?.[testKey];

        if (!importer) {
          toast.error("Panel not found");

          return;
        }

        const module = await importer();

        const panelDef = Object.values(module)[0];

        setPanel(panelDef);
      } catch (err) {
        console.error(err);

        toast.error("Failed to load panel");
      }
    };

    loadPanel();
  }, [report]);

  // ======================================================
  // HELPERS
  // ======================================================

  const parseRange = (range: any, gender = "male") => {
    if (!range) return null;

    // ==========================================
    // STRING RANGE
    // ==========================================

    if (typeof range === "string") {
      return range;
    }

    // ==========================================
    // GENDER RANGE
    // ==========================================

    if (range.male || range.female) {
      const selected =
        gender.toLowerCase() === "female" ? range.female : range.male;

      return selected;
    }

    // ==========================================
    // NORMAL RANGE
    // ==========================================

    if (typeof range.min !== "undefined" && typeof range.max !== "undefined") {
      return range;
    }

    return null;
  };

  const getStatus = (value: any, range: any) => {
    if (!range || typeof range === "string") {
      return null;
    }

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

  const formatReference = (referenceRange: any) => {
    if (!referenceRange) {
      return "-";
    }

    // ==========================================
    // STRING
    // ==========================================

    if (typeof referenceRange === "string") {
      return referenceRange;
    }

    // ==========================================
    // GENDER BASED
    // ==========================================

    if (referenceRange.male || referenceRange.female) {
      const male = referenceRange.male
        ? referenceRange.male.min === referenceRange.male.max
          ? `${referenceRange.male.min} (M)`
          : `${referenceRange.male.min} - ${referenceRange.male.max} (M)`
        : "";

      const female = referenceRange.female
        ? referenceRange.female.min === referenceRange.female.max
          ? `${referenceRange.female.min} (F)`
          : `${referenceRange.female.min} - ${referenceRange.female.max} (F)`
        : "";

      return [male, female].filter(Boolean).join(" / ");
    }

    // ==========================================
    // NORMAL RANGE
    // ==========================================

    if (
      typeof referenceRange.min !== "undefined" &&
      typeof referenceRange.max !== "undefined"
    ) {
      return referenceRange.min === referenceRange.max
        ? `${referenceRange.min}`
        : `${referenceRange.min} - ${referenceRange.max}`;
    }

    return "-";
  };

  // ======================================================
  // DOWNLOAD PDF
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

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading report...
      </div>
    );
  }

  // ======================================================
  // NOT FOUND
  // ======================================================

  if (!report || !panel) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Report not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}

        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{report.panelTitle}</h1>

            <p className="text-sm text-gray-400 mt-1">
              {report.clinicalCategory} • {report.specimenType}
            </p>

            <div className="mt-3 space-y-1 text-sm">
              <p>
                <span className="text-gray-400">Patient ID:</span>{" "}
                {report.patientId}
              </p>

              <p>
                <span className="text-gray-400">Report ID:</span> {report.id}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              className="bg-white/10 text-white hover:bg-white/20"
              onClick={() => downloadPDF(String(report.id))}
            >
              Download PDF
            </Button>

            <Button
              type="button"
              className="bg-white/10 text-white hover:bg-white/20"
              onClick={() => router.back()}
            >
              ← Back
            </Button>
          </div>
        </div>

        {/* TEST GRID */}

        <div className="grid md:grid-cols-2 gap-4">
          {panel.tests.map((test: any) => {
            const value = report.values?.[test.key];

            const range = parseRange(test.referenceRange);

            const status = getStatus(value, range);

            return (
              <Card
                key={test.key}
                className={`bg-white/5 border ${getStyle(status)}`}
              >
                <CardContent className="p-4 space-y-3">
                  {/* TOP */}

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-sm">{test.name}</h3>

                      <p className="text-xs text-gray-400 mt-1">{test.unit}</p>
                    </div>

                    {status && (
                      <span className="text-xs font-semibold">{status}</span>
                    )}
                  </div>

                  {/* VALUE */}

                  <div className="text-2xl font-bold">
                    {String(value ?? "-")}
                  </div>

                  {/* REFERENCE */}

                  <div className="text-xs text-gray-400">
                    <span className="text-gray-500">Reference:</span>{" "}
                    {formatReference(test.referenceRange)}
                  </div>

                  {/* STATUS MESSAGE */}

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
      </div>
    </div>
  );
}
