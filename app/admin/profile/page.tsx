"use client";

import { getLabDataAction } from "@/features/db/admin-queries";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export default function AdminProfile() {
  const { userId, number, gender } = useSelector(
    (state: any) => state.user.user,
  );

  const [admin, setAdmin] = useState<any>(null);

  const [stats, setStats] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getLabDataAction(userId);

        setAdmin(res.adminData);

        setStats(res.statsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadData();
    }
  }, [userId]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ==========================================
  // NO ADMIN
  // ==========================================

  if (!admin || !stats) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
          {/* PROFILE */}

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-gray-400">LabId:</span> {userId}
              </p>
              <p>
                <span className="text-gray-400">Name:</span> {admin.name}
              </p>
              <p>
                <span className="text-gray-400">Email:</span> {admin.email}
              </p>
              <p>
                <span className="text-gray-400">Gender:</span> {gender}
              </p>
              <p>
                <span className="text-gray-400">Mobile:</span> {number}
              </p>
            </div>
          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">{stats.reports}</p>

              <p className="text-gray-400 text-sm">Reports Uploaded</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold">{stats.patients}</p>

              <p className="text-gray-400 text-sm">Patients Managed</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
