// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUser } from "./js/api";

import Link from "next/link";

const LandingPage = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const user = getUser();
  //   if (user) {
  //     setTimeout(() => {
  //       navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
  //     }, 300);
  //   }
  // }, [navigate]);

  return (
    <div className=" bg-[#020617] text-white flex flex-col">
      {/* Main */}
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-emerald-400 text-sm mb-3">
              🏥 Laboratory Health Unit
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Lab results for <br />
              <span className="text-emerald-400">All Laboratory</span>
              <br />
              patients
            </h1>

            <p className="text-gray-400 mb-8">
              A secure portal for the Laboratory Lab Superintendent to upload
              structured blood test reports, and for patients to access their
              own results anytime.
            </p>

            <div className="flex gap-4">
              <a
                href="/login"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black px-6 py-3 rounded-lg font-medium hover:opacity-90"
              >
                Login to your account
              </a>
              <a
                href="/register"
                className="border border-white/10 px-6 py-3 rounded-lg hover:bg-white/5"
              >
                Create account
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {[
              {
                icon: "🔬",
                title: "Structured Test Entry",
                desc: "Admin enters CVC, LFT, KFT and infection rapid test values with full parameter details.",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                desc: "Each patient sees only their own reports. Role-based access keeps all data protected.",
              },
              {
                icon: "📄",
                title: "PDF Download",
                desc: "Download any report as a formatted PDF — no physical visit needed.",
              },
              {
                icon: "🧪",
                title: "Tests Supported",
                desc: "CVC, LFT, KFT, and infection rapid tests — Malaria, HIV, HBsAg, VDRL, Dengue.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur"
              >
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
