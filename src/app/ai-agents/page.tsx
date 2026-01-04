"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Agent {
  title: string;
  purpose: string;
  copy: string;
}

// ---------------- DATA ----------------
const qualitativeAgents = [
  {
    title: "Fire Safety Agent",
    purpose: "Ensure every building is safe and compliant.",
    copy:
      "Automatically validate exit routes, stair widths, and sprinklers. Detect potential fire hazards early, prevent rework, and keep your designs compliant with Indian fire safety codes.",
  },
  {
    title: "Accessibility & Universal Design Agent",
    purpose: "Make your buildings inclusive for everyone.",
    copy:
      "Check ramps, toilets, and corridors for universal accessibility. Starline highlights areas that may fail audits, helping you design inclusive, regulation-compliant spaces effortlessly.",
  },
  {
    title: "Land Use Agent",
    purpose: "Zoning and FAR/FSI compliance simplified.",
    copy:
      "Validate setbacks, ground coverage, and zoning rules automatically. Ensure your site plans meet municipal regulations and avoid time-consuming plan rejections.",
  },
  {
    title: "Architectural Functionality Agent",
    purpose: "Ensure layouts work in real life.",
    copy:
      "Check room sizes, circulation, and amenity placement for functional designs. Starline flags inefficiencies and prevents costly redesigns before submission.",
  },
  {
    title: "Environmental Ventilation & Lighting Agent",
    purpose: "Comfortable, code-compliant indoor environments.",
    copy:
      "Validate natural ventilation, daylight, and airflow in every room. Starline ensures your designs meet regulatory and environmental comfort standards.",
  },
];

const quantitativeAgents = [
  {
    title: "Fire Safety (Quantitative) Agent",
    purpose: "Precise measurement of safety compliance.",
    copy:
      "Automatically calculate travel distances, stair widths, and number of exits based on occupancy. Ensure every fire safety parameter meets code requirements before submission.",
  },
  {
    title: "Zoning & FAR / FSI Calculation Agent",
    purpose: "Automated land-use validation.",
    copy:
      "Compute built-up area versus allowable FAR, ground coverage %, and height limits instantly. Starline prevents zoning errors that delay approvals.",
  },
  {
    title: "Structural Safety Agent",
    purpose: "Verify building structural integrity.",
    copy:
      "Check load calculations, reinforcement placement, and seismic compliance automatically. Reduce structural risks and avoid costly errors early in the design phase.",
  },
  {
    title: "MEP (Quantitative) Agent",
    purpose: "Building services compliance made simple.",
    copy:
      "Validate pipe sizes, duct routing, electrical loads, and sprinkler coverage. Starline ensures your MEP plans meet code standards and function efficiently.",
  },
  {
    title: "Energy Efficiency Agent",
    purpose: "Optimize building energy performance.",
    copy:
      "Automatically check U-values, window-to-wall ratios, lighting density, and solar heat gain. Ensure your designs meet sustainability and energy compliance regulations.",
  },
];

// ---------------- CARD ----------------
const AgentCard = ({ agent, comingSoon, onClick }: { agent: Agent; comingSoon?: boolean; onClick: () => void }) => (
  <motion.div
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="cursor-pointer rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
  >
    {comingSoon && (
      <span className="inline-block mb-3 text-xs font-medium text-gray-500 border border-gray-300 rounded-full px-3 py-1">
        Coming Soon
      </span>
    )}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.title}</h3>
    <p className="text-sm font-medium text-gray-600 mb-3">
      Purpose: {agent.purpose}
    </p>
    <p className="text-gray-600 text-sm leading-relaxed">{agent.copy}</p>
  </motion.div>
);

// ---------------- PAGE ----------------
export default function FeaturesPage() {
  const [active, setActive] = useState<Agent | null>(null);
  const [tab, setTab] = useState<"live" | "soon">("live");

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between">
          {/* background texture */}
          <motion.div
            aria-hidden
            className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gray-200/40 blur-3xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gray-300/40 blur-3xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity }}
          />

          <div className="relative max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-800 bg-clip-text text-transparent">
              Explore Specialised AI Agents
            </h1>
            <p className="text-gray-600">
              Purpose-built AI agents that help architects, consultants, and developers validate building compliance faster and with confidence.
            </p>
          </div>

          <div className="relative mt-6 md:mt-0 flex items-center rounded-full border border-gray-300 bg-white p-1 shadow-sm">
            <button
              onClick={() => setTab("live")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition ${tab === "live"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Live Agents
            </button>
            <button
              onClick={() => setTab("soon")}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition ${tab === "soon"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {tab === "live" && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {qualitativeAgents.map((agent, i) => (
                <AgentCard key={i} agent={agent} onClick={() => setActive(agent)} />
              ))}
            </motion.div>
          )}

          {tab === "soon" && (
            <motion.div
              key="soon"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {quantitativeAgents.map((agent, i) => (
                <AgentCard
                  key={i}
                  agent={agent}
                  comingSoon
                  onClick={() => setActive(agent)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-2">{active.title}</h3>
              <p className="text-sm font-medium text-gray-600 mb-4">
                Purpose: {active.purpose}
              </p>
              <p className="text-gray-700 leading-relaxed">{active.copy}</p>
              <button
                onClick={() => setActive(null)}
                className="mt-6 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
