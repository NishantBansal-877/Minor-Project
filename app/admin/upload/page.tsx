"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, Controller, useWatch } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { searchPatients } from "@/features/db/patients-queries";
import { useDispatch } from "react-redux";
import { addSelectedUser } from "@/lib/store/slices/user-slice";

type FormType = {
  selectedPatient: string;
  search: string;
};

type Patient = {
  name: string;
  number: string;
  userId: string;
};

export default function UploadSelectPatientPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { control, setValue, handleSubmit } = useForm<FormType>({
    defaultValues: {
      selectedPatient: "",
      search: "",
    },
  });

  /* ✅ FIX: useWatch instead of watch */
  const selectedPatient = useWatch({
    control,
    name: "selectedPatient",
  });

  const search = useWatch({
    control,
    name: "search",
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  /* SEARCH (debounced) */
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!search) {
        setPatients([]);
        return;
      }

      setLoading(true);
      try {
        const res = await searchPatients(search);
        setPatients(res || []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const selectedPatientData = patients.find(
    (p) => p.userId === selectedPatient,
  );

  /* SUBMIT */
  const onSubmit = (data: FormType) => {
    const selected = patients.find((p) => p.userId === data.selectedPatient);

    if (!selected) return;

    dispatch(addSelectedUser(selected));

    router.push(`/admin/upload/tests?patient=${data.selectedPatient}`);
  };

  const canProceed = !!selectedPatient;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-[#020617] text-white flex flex-col"
    >
      <main className="flex-1 flex justify-center pt-12 px-4">
        <div className="w-full max-w-xl">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur shadow-xl">
            {/* TOP */}
            <div className="flex items-start gap-3 mb-6">
              <Link href="/admin/dashboard">
                <Button
                  type="button"
                  variant="outline"
                  className="px-3 py-1.5 text-sm border-white/10 bg-transparent"
                >
                  ← Back
                </Button>
              </Link>

              <div>
                <h2 className="text-lg font-semibold">Select Patient</h2>
                <p className="text-gray-400 text-sm">
                  Choose or search patient for lab report creation
                </p>
              </div>
            </div>

            {/* SELECTED */}
            {selectedPatientData && (
              <div className="mb-5 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
                <p className="font-medium">{selectedPatientData.name}</p>
                <p className="text-xs text-gray-400">
                  {selectedPatientData.userId} • {selectedPatientData.number}
                </p>
              </div>
            )}

            {/* SEARCH */}
            <div className="mb-4">
              <label className="text-sm text-gray-400">Search Patient</label>

              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Name / Phone / Patient ID"
                    className="w-full mt-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                )}
              />
            </div>

            {/* LOADING */}
            {loading && (
              <p className="text-xs text-gray-400 mb-2">Searching...</p>
            )}

            {/* RESULTS */}
            <div className="mb-4 max-h-60 overflow-y-auto space-y-2">
              {patients.map((p) => {
                const active = selectedPatient === p.userId;

                return (
                  <div
                    key={p.userId}
                    onClick={() =>
                      setValue("selectedPatient", p.userId, {
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      active
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-400">
                      {p.userId} • {p.number}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* INFO */}
            <div className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-lg p-3 mb-5">
              Search and select a patient to continue.
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={!canProceed}
              className={`w-full py-2.5 rounded-lg font-medium ${
                canProceed
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-black"
                  : "bg-white/10 text-gray-500"
              }`}
            >
              Next → Select Tests
            </Button>
          </div>
        </div>
      </main>
    </form>
  );
}
