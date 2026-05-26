"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  searchPatients,
  searchRegisteredPatients,
} from "@/features/db/patients-queries";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedUser,
  resetSelectedUser,
} from "@/lib/store/slices/user-slice";

type Patient = {
  name: string;
  number: string;
  userId: string;
};

type FormType = {
  selectedRegistered: string;
  selectedNew: string;
  search: string;
};

export default function SelectPatientPage() {
  const router = useRouter();

  const { setValue, watch, handleSubmit } = useForm<FormType>({
    defaultValues: {
      selectedRegistered: "",
      selectedNew: "",
      search: "",
    },
  });

  const selectedRegistered = watch("selectedRegistered");
  const selectedNew = watch("selectedNew");
  const search = watch("search");

  const [registeredPatients, setRegisteredPatients] = useState<Patient[]>([]);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [modalResults, setModalResults] = useState<Patient[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  const labId = useSelector((state: any) => state.user.user.userId);
  const dispatch = useDispatch();

  dispatch(resetSelectedUser());

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!search) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await searchRegisteredPatients(search, labId);
        setSearchResults(res || []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  /* ================= MODAL SEARCH (ADDED) ================= */
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!modalSearch) {
        setModalResults([]);
        return;
      }

      setModalLoading(true);
      try {
        const res = await searchPatients(modalSearch);
        setModalResults(res || []);
      } finally {
        setModalLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [modalSearch]);

  /* ================= FINAL SELECT ================= */
  const selectedPatient =
    registeredPatients.find((p) => p.userId === selectedRegistered) ||
    searchResults.find((p) => p.userId === selectedNew) ||
    modalResults.find((p) => p.userId === selectedNew);

  const selectedPatientData =
    registeredPatients.find((p) => p.userId === selectedRegistered) ||
    searchResults.find((p) => p.userId === selectedNew) ||
    modalResults.find((p) => p.userId === selectedNew);

  /* ================= SUBMIT ================= */
  const onSubmit = () => {
    if (!selectedPatient) return;
    console.log(selectedPatient);
    dispatch(addSelectedUser(selectedPatient));
    router.push(`/admin/upload/tests?patient=${selectedPatient.userId}`);
  };

  const canProceed = !!selectedPatient;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-2 bg-[#020617] text-white flex justify-center pt-10 px-4 pb-10"
    >
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-1">Select Patient</h2>
        <p className="text-sm text-gray-400 mb-6">
          Choose from lab patients or search global database
        </p>
        {/* ================= SELECTED PATIENT PREVIEW ================= */}
        {selectedPatientData && (
          <div className="mb-5 p-3 border border-emerald-500/30 bg-emerald-500/10 rounded-lg">
            <p className="font-medium">{selectedPatientData.name}</p>
            <p className="text-xs text-gray-400">
              {selectedPatientData.userId} • {selectedPatientData.number}
            </p>

            <p className="text-xs text-emerald-400 mt-1">Selected Patient</p>
          </div>
        )}
        <div className="mb-6">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {registeredPatients.map((p) => (
              <div
                key={p.userId}
                onClick={() => {
                  setValue("selectedRegistered", p.userId);
                  setValue("selectedNew", "");
                }}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  selectedRegistered === p.userId
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-gray-400">
                  {p.userId} • {p.number}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SEARCH (UNCHANGED) ================= */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Search Lab Patients</p>

          <Input
            value={search}
            onChange={(e) => setValue("search", e.target.value)}
            placeholder="Name / Number / ID"
            className="bg-white/5 border-white/10"
          />

          {loading && (
            <p className="text-xs text-gray-400 mt-2">Searching...</p>
          )}

          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {searchResults.map((p) => (
              <div
                key={p.userId}
                onClick={() => {
                  setValue("selectedNew", p.userId);
                  setValue("selectedRegistered", "");
                }}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  selectedNew === p.userId
                    ? "border-emerald-500 bg-blue-500/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-gray-400">
                  {p.userId} • {p.number}
                </p>
              </div>
            ))}
          </div>

          {/* ================= ADD BUTTON (NOW OPENS MODAL) ================= */}
          <div className="mt-4 p-3 border border-white/10 rounded-lg bg-white/5">
            <p className="text-sm text-gray-300">Don’t find the patient?</p>

            <Button
              type="button"
              className="mt-2 w-full bg-emerald-500 text-black"
              onClick={() => setOpen(true)}
            >
              + Add New Patient
            </Button>
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div className="text-xs text-gray-400 bg-white/5 border border-white/10 p-3 rounded-lg mb-5">
          Select from registered patients or search global database.
        </div>

        {/* ================= SUBMIT (UNCHANGED) ================= */}
        <Button
          type="submit"
          disabled={!canProceed}
          className={`w-full ${
            canProceed
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-black"
              : "bg-white/10 text-gray-500"
          }`}
        >
          Continue → Select Tests
        </Button>
      </div>

      {/* ================= MODAL (ADDED ONLY) ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">Search Patient</h3>

              <button onClick={() => setOpen(false)} className="text-gray-400">
                ✕
              </button>
            </div>

            <Input
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              placeholder="Search by name / number / ID"
              className="bg-white/5 border-white/10"
            />

            {modalLoading && (
              <p className="text-xs text-gray-400 mt-2">Searching...</p>
            )}

            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto scroll-0">
              {modalResults.map((p) => (
                <div
                  key={p.userId}
                  onClick={() => {
                    setValue("selectedNew", p.userId);
                    setValue("selectedRegistered", "");
                    setOpen(false);
                  }}
                  className="p-3 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-gray-400">
                    {p.userId} • {p.number}
                  </p>
                </div>
              ))}
            </div>

            <Button
              type="button"
              className="mt-4 w-full bg-emerald-500 text-black"
              onClick={() => {
                console.log("Create new patient flow");
              }}
            >
              + Create New Patient
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
