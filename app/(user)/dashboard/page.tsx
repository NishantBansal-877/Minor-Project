"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { User } from "@/lib/store/slices/user-slice";

type Report = {
  id: string;
  title: string;
  date: string;
  status: "normal" | "critical" | "pending";
};

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const user: User = useSelector((state: any) => state.user.user);
  console.log(user);

  useEffect(() => {
    const data: Report[] = [
      {
        id: "1",
        title: "Complete Blood Count (CBC)",
        date: "2025-03-20",
        status: "normal",
      },
      {
        id: "2",
        title: "Liver Function Test (LFT)",
        date: "2025-02-11",
        status: "critical",
      },
      {
        id: "3",
        title: "Kidney Function Test (KFT)",
        date: "2025-01-05",
        status: "pending",
      },
    ];
    setReports(data);
  }, []);

  const filtered = reports
    .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "newest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

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

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
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
                    {new Date(report.date).toDateString()}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded ${statusColor(
                      report.status,
                    )}`}
                  >
                    {report.status}
                  </span>

                  <div className="mt-4 flex justify-between items-center">
                    <button className="text-emerald-400 text-sm hover:underline">
                      View
                    </button>
                    <button className="text-gray-400 text-sm hover:text-white">
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
