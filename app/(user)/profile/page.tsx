"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Visit = {
  id: string;
  date: string;
  test: string;
  status: string;
};

export default function UserProfile() {
  const [visits, setVisits] = useState<Visit[]>([]);

  const user = {
    name: "Ashok Kumar",
    patientId: "LIS-ASH-4821",
    phone: "+91 98XXXXXX21",
    email: "ashok@example.com",
    gender: "Male",
  };

  useEffect(() => {
    // mock data
    setVisits([
      { id: "1", date: "2025-03-20", test: "CBC", status: "normal" },
      { id: "2", date: "2025-02-10", test: "LFT", status: "critical" },
      { id: "3", date: "2025-01-05", test: "KFT", status: "normal" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#020617]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            LIS
          </Link>
          <Link href="/dashboard" className="text-sm text-gray-400">
            Back
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
          {/* Profile Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-gray-400">Name:</span> {user.name}
              </p>
              <p>
                <span className="text-gray-400">Patient ID:</span>{" "}
                {user.patientId}
              </p>
              <p>
                <span className="text-gray-400">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="text-gray-400">Email:</span> {user.email}
              </p>
              <p>
                <span className="text-gray-400">Gender:</span> {user.gender}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">{visits.length}</p>
              <p className="text-gray-400 text-sm">Total Visits</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">
                {visits.filter((v) => v.status === "critical").length}
              </p>
              <p className="text-gray-400 text-sm">Critical Reports</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">
                {visits[0]
                  ? new Date(visits[0].date).toLocaleDateString()
                  : "-"}
              </p>
              <p className="text-gray-400 text-sm">Last Visit</p>
            </div>
          </div>

          {/* Visit History */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Visit History</h3>

            <div className="space-y-3">
              {visits.map((v) => (
                <div
                  key={v.id}
                  className="flex justify-between items-center border border-white/10 rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{v.test}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(v.date).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
