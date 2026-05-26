"use client";

import { useEffect, useMemo, useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";

import { Camera, FileText, ImageIcon, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type Props = {
  file: File | null;

  onFileSelect: (file: File) => void;
};

export default function DocumentPreview({ file, onFileSelect }: Props) {
  const [pages, setPages] = useState(0);

  const [dragActive, setDragActive] = useState(false);

  /* ========================================
     IMAGE PREVIEW URL
  ======================================== */

  const imageUrl = useMemo(() => {
    if (!file) return "";

    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }

    return "";
  }, [file]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  /* ========================================
     HANDLE FILE
  ======================================== */

  const handleFile = (f: File) => {
    onFileSelect(f);
  };

  /* ========================================
     RESET
  ======================================== */

  const removeFile = () => {
    setPages(0);
  };

  return (
    <div className="space-y-5">
      {/* ========================================
          UPLOAD AREA
      ======================================== */}

      <Card
        className={`
          border-2 border-dashed
          transition-all duration-300
          bg-slate-950/60
          backdrop-blur
          overflow-hidden
          ${
            dragActive
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-white/10"
          }
        `}
      >
        <CardContent className="p-0">
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*,.pdf"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];

                if (!f) return;

                handleFile(f);
              }}
            />

            <div
              className="
                min-h-[220px]
                flex flex-col items-center justify-center
                gap-4
                px-6 py-10
                text-center
              "
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => {
                e.preventDefault();

                setDragActive(true);
              }}
              onDrop={(e) => {
                e.preventDefault();

                setDragActive(false);

                const f = e.dataTransfer.files?.[0];

                if (!f) return;

                handleFile(f);
              }}
            >
              <div
                className="
                  h-16 w-16 rounded-2xl
                  bg-emerald-500/10
                  flex items-center justify-center
                "
              >
                <Upload className="h-8 w-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  Upload Lab Report
                </h3>

                <p className="text-sm text-slate-400 max-w-md">
                  Upload PDF/image reports for automatic value extraction.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {/* <div
                  className="
                    px-3 py-2 rounded-xl
                    bg-white/5 border border-white/10
                    flex items-center gap-2 text-sm
                  "
                >
                  <Camera className="h-4 w-4" />
                  Live Camera
                </div> */}

                <div
                  className="
                    px-3 py-2 rounded-xl
                    text-white
                    bg-white/5 border border-white/10
                    flex items-center gap-2 text-sm
                  "
                >
                  <ImageIcon className="h-4 w-4" />
                  Images
                </div>

                <div
                  className="
                    px-3 py-2 rounded-xl
                    text-white
                    bg-white/5 border border-white/10
                    flex items-center gap-2 text-sm
                  "
                >
                  <FileText className="h-4 w-4" />
                  PDF Reports
                </div>
              </div>
            </div>
          </label>
        </CardContent>
      </Card>

      {/* ========================================
          PREVIEW
      ======================================== */}

      {file && (
        <Card className="bg-slate-950/70 border border-white/10 overflow-hidden">
          {/* HEADER */}

          <div
            className="
              flex items-center justify-between
              border-b border-white/10
              px-4 py-3
            "
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="
                  h-11 w-11 rounded-xl
                  bg-emerald-500/10
                  flex items-center justify-center
                  shrink-0
                "
              >
                {file.type.includes("pdf") ? (
                  <FileText className="h-5 w-5 text-emerald-400" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-emerald-400" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {file.name}
                </p>

                <p className="text-xs text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* CONTENT */}

          <CardContent className="p-4">
            {file.type.includes("pdf") ? (
              <div className="space-y-4 max-h-[700px] overflow-auto rounded-xl border border-white/10 p-3 bg-black/20">
                <Document
                  file={file}
                  loading={
                    <div className="text-center py-10 text-slate-400">
                      Loading PDF...
                    </div>
                  }
                  onLoadSuccess={({ numPages }) => setPages(numPages)}
                >
                  <div className="space-y-6 flex flex-col items-center">
                    {Array.from(new Array(pages), (_, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                      >
                        <Page
                          pageNumber={index + 1}
                          width={700}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </div>
                    ))}
                  </div>
                </Document>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 flex justify-center p-3">
                <img
                  src={imageUrl}
                  alt="preview"
                  className="
                    rounded-xl
                    max-h-[700px]
                    object-contain
                  "
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
