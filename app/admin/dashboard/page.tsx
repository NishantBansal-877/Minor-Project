"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteReport, getPatientDetail } from "@/features/db/admin-queries";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Visit = {
  id: string;
  date: string;
  test: string;
  status: "normal" | "critical" | "pending";
};

type Patient = {
  id: string;
  name: string;
  patientId: string;
  visits: Visit[];
};

export default function AdminDashboard() {
  const [patients, setPatients] = useState<Patient[] | undefined>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { userId } = useSelector((state: any) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    const getAllPatientReports = async () => {
      const data = await getPatientDetail(userId);
      setPatients(data);
    };

    if (userId) {
      getAllPatientReports();
    }
  }, [userId]);

  const filtered = patients?.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()),
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

  const handleViewReport = (patientId: string, reportId: string) => {
    router.push(`/admin/view/${patientId}/${reportId}`);
  };

  const handleDeleteReport = async (reportId: string) => {
    const res = await deleteReport(reportId);

    if (res.status === "SUCCESSFUL") {
      toast.success(res.message);
      setPatients((prev) =>
        prev
          ?.map((p) => ({
            ...p,
            visits: p.visits.filter((v) => v.id !== reportId),
          }))
          .filter((p) => p.visits.length > 0),
      );
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Main */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
              <p className="text-gray-400 text-sm">
                Patient records & visit history
              </p>
            </div>

            <Link
              href="/admin/upload"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black px-5 py-2.5 rounded-lg font-medium"
            >
              + Add Report
            </Link>
          </div>

          {/* Search */}
          <input
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* Patients */}
          <div className="space-y-4">
            {filtered?.map((patient) => {
              const lastVisit = patient.visits[patient.visits.length - 1];

              return (
                <div
                  key={patient.id}
                  className="border border-white/10 rounded-xl bg-white/5"
                >
                  {/* Patient Row */}
                  <div
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-white/5"
                    onClick={() =>
                      setExpanded(expanded === patient.id ? null : patient.id)
                    }
                  >
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-gray-400">
                        {patient.patientId}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <p className="text-gray-400">Visits</p>
                        <p>{patient.visits.length}</p>
                      </div>

                      <div>
                        <p className="text-gray-400">Last Visit</p>
                        <p>{new Date(lastVisit.date).toLocaleDateString()}</p>
                      </div>

                      <span
                        className={`px-2 py-1 text-xs rounded ${statusColor(
                          lastVisit.status,
                        )}`}
                      >
                        {lastVisit.status}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Section */}
                  {expanded === patient.id && (
                    <div className="border-t border-white/10 p-4 space-y-4">
                      {[...patient.visits].reverse().map((visit) => (
                        <div
                          key={visit.id}
                          className="bg-[#020617] border border-white/10 rounded-lg p-4"
                        >
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{visit.test}</h4>
                            <span
                              className={`text-xs px-2 py-1 rounded ${statusColor(
                                visit.status,
                              )}`}
                            >
                              {visit.status}
                            </span>
                          </div>

                          <p className="text-sm text-gray-400 mb-1">
                            Date: {new Date(visit.date).toLocaleDateString()}
                          </p>

                          {/* <p className="text-sm text-gray-400 mb-1">
                            Doctor: {visit.doctor}
                          </p> */}
                          {/* 
                          <p className="text-sm">
                            <span className="text-gray-400">Notes:</span>{" "}
                            {visit.notes}
                          </p>

                          <p className="text-sm mt-1">
                            <span className="text-gray-400">Prescription:</span>{" "}
                            {visit.prescription}
                          </p> */}

                          <div className="mt-3 flex gap-4 text-sm">
                            <button
                              className="text-emerald-400 hover:underline"
                              onClick={() =>
                                handleViewReport(patient.id, visit.id)
                              }
                            >
                              View Report
                            </button>

                            <button
                              className="text-red-400 hover:underline"
                              onClick={() => handleDeleteReport(visit.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
