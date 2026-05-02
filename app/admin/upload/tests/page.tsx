"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TEST_GROUPS } from "@/lib/constants-types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SelectedGroup, setSelectedTests } from "@/lib/store/slices/lab-slice";

type SelectedGroupsType = SelectedGroup[];

export default function UploadTestsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const selectedUser = useSelector((state: any) => state.user.selectedUser);

  const filteredGroups = useMemo(() => {
    if (!search) return TEST_GROUPS;

    return TEST_GROUPS.map((group) => ({
      ...group,
      tests: group.tests.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.desc.toLowerCase().includes(search.toLowerCase()),
      ),
    })).filter((g) => g.tests.length > 0);
  }, [search]);

  const selectedGroups = useMemo(() => {
    return TEST_GROUPS.map((group) => {
      const tests = group.tests.filter((t) => selected.includes(t.id));

      if (tests.length === 0) return null;

      return {
        title: group.title,
        icon: group.icon,
        tests,
      };
    }).filter(Boolean);
  }, [selected]);

  const handleContinue = () => {
    dispatch(setSelectedTests(selectedGroups as SelectedGroupsType));
    console.log(selectedGroups);
    router.push(`/admin/upload/fill/${selectedUser.userId}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* MAIN */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {/* PATIENT */}
        <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Selected Patient</p>
            <p className="font-medium">{selectedUser?.name}</p>
            <p className="text-xs text-gray-500">{selectedUser?.userId}</p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active
          </span>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Select Tests</h1>

          <Link
            href="/admin/upload"
            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5"
          >
            ← Back
          </Link>
        </div>

        <p className="text-gray-400 mb-6">
          Choose laboratory and radiology tests for this patient
        </p>

        {/* SEARCH */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tests (CBC, MRI, Liver...)"
          className="w-full px-4 py-2.5 mb-8 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* TESTS */}
        <div className="space-y-10">
          {filteredGroups.map((group: any) => (
            <div key={group.title}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{group.icon}</span>
                <h2 className="text-lg font-semibold">{group.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {group.tests.map((test: any) => {
                  const active = selected.includes(test.id);

                  return (
                    <div
                      key={test.id}
                      onClick={() => toggle(test.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                        active
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-white/10 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{test.name}</h4>
                          <p className="text-sm text-gray-400">{test.desc}</p>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            active
                              ? "bg-emerald-500 text-black border-emerald-500"
                              : "border-white/20"
                          }`}
                        >
                          {active && "✓"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* BOTTOM BAR */}
      <div className="sticky bottom-0 bg-[#020617]/90 backdrop-blur border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            <span className="text-white font-medium">{selected.length}</span>{" "}
            selected
          </div>

          {selected.length > 0 && (
            <Button
              onClick={handleContinue}
              className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5"
            >
              Continue →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
