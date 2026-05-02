"use client";

import Link from "next/link";

export default function AdminProfile() {
  const admin = {
    name: "Dr. Rajesh Mehta",
    role: "Lab Superintendent",
    email: "admin@lis.com",
    phone: "+91 98XXXXXX11",
  };

  const stats = {
    reports: 128,
    patients: 54,
    critical: 12,
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Main */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
          {/* Profile */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-gray-400">Name:</span> {admin.name}
              </p>
              <p>
                <span className="text-gray-400">Role:</span> {admin.role}
              </p>
              <p>
                <span className="text-gray-400">Email:</span> {admin.email}
              </p>
              <p>
                <span className="text-gray-400">Phone:</span> {admin.phone}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">{stats.reports}</p>
              <p className="text-gray-400 text-sm">Reports Uploaded</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">{stats.patients}</p>
              <p className="text-gray-400 text-sm">Patients Managed</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-red-400">
                {stats.critical}
              </p>
              <p className="text-gray-400 text-sm">Critical Cases</p>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li>✔ Uploaded CBC report for Ashok Kumar</li>
              <li>✔ Edited LFT report for Ravi Sharma</li>
              <li>⚠ Marked KFT report as critical</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
