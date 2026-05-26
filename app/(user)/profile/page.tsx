"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPatientDetail } from "@/features/db/admin-queries";
import { useSelector } from "react-redux";

type Visit = {
  id: string;
  date: string;
  test: string;
  status: string;
};

export default function UserProfile() {
  const { userId, name, email, gender, number } = useSelector(
    (state: any) => state.user.user,
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Main */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
          {/* Profile Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-gray-400">Name:</span> {name}
              </p>
              <p>
                <span className="text-gray-400">Patient ID:</span> {userId}
              </p>

              <p>
                <span className="text-gray-400">Email:</span> {email}
              </p>
              <p>
                <span className="text-gray-400">Gender:</span> {gender}
              </p>
              <p>
                <span className="text-gray-400">Mobile:</span> {number}
              </p>
            </div>
          </div>

          {/* Stats
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
          </div> */}

          {/* Visit History */}
          {/* <div className="bg-white/5 border border-white/10 rounded-xl p-6">
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
            </div> */
          /* </div> */}
        </div>
      </main>
    </div>
  );
}
