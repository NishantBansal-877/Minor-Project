"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { User } from "@/lib/store/slices/user-slice";
import { get } from "http";
import { getPatientsReportAction } from "@/features/db/patients-queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

type Report = {
  id: number;
  title: string;
  date: Date | null;
  status: string | null;
};

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const user: User = useSelector((state: any) => state.user.user);

  useEffect(() => {
    getPatientsReportAction(user.userId).then((data) => {
      setReports(data);
    });
  }, [user.userId]);

  const handleView = (reportId: number) => {
    router.push(`/report/${reportId}`);
  };
  const filtered = reports
    .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;

      return sort === "newest" ? bTime - aTime : aTime - bTime;
    });

  const statusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-emerald-400 bg-emerald-500/10";
      case "critical":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-yellow-400 bg-yellow-500/10";
    }
  };

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
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Main */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-semibold">My Lab Reports</h2>
              <p className="text-gray-400 text-sm">Patient ID: {user.userId}</p>
            </div>

            <div className="flex gap-3">
              <input
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="relative w-40">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="
      appearance-none
      w-full
      rounded-xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-md
      px-4
      py-2.5
      pr-10
      text-sm
      text-white
      outline-none
      transition-all
      duration-200
      hover:bg-white/10
      focus:border-emerald-400
      focus:ring-2
      focus:ring-emerald-400/20
      cursor-pointer
    "
                >
                  <option value="newest" className="bg-[#0f172a]">
                    Newest
                  </option>

                  <option value="oldest" className="bg-[#0f172a]">
                    Oldest
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      text-gray-400
      pointer-events-none
    "
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 border border-white/10 rounded-xl p-10">
              No reports found
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((report) => (
                <div
                  key={report.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition"
                >
                  <h3 className="font-semibold mb-2">{report.title}</h3>

                  <p className="text-sm text-gray-400 mb-3">
                    {report.date
                      ? new Date(report.date).toDateString()
                      : "No date"}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded ${statusColor(
                      report.status!,
                    )}`}
                  >
                    {report.status}
                  </span>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => handleView(report.id)}
                      className="text-emerald-400 text-sm hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => downloadPDF(String(report.id))}
                      className="text-gray-400 text-sm hover:text-white"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
