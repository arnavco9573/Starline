"use client";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts";

/* ---------------- DATA ---------------- */

const accuracyData = [
  { name: "Recall", value: 94 },
  { name: "Precision", value: 94 },
  { name: "Accuracy", value: 91 },
];

const timeData = [
  { name: "Human Review", minutes: 10 },
  { name: "StarlineAI", minutes: 4 },
];

const coverageData = [
  { subject: "NBC", value: 95 },
  { subject: "State Rules", value: 88 },
  { subject: "Municipal By-laws", value: 82 },
  { subject: "Zoning", value: 78 },
  { subject: "Fire & Safety", value: 90 },
];

const issueFlowData = [
  { step: "Drawing Input", value: 20 },
  { step: "Rule Parsing", value: 40 },
  { step: "Issue Detection", value: 65 },
  { step: "Human Review", value: 80 },
];

/* ---------------- PAGE ---------------- */

export default function ResearchEvaluationPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-24 text-gray-900">

      {/* HERO */}
      <section className="max-w-7xl mx-auto mb-48">
        <div className="grid md:grid-cols-12 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="md:col-span-7"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900">Research</span>{" "}
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-800 bg-clip-text text-transparent">&amp; Evaluation</span>
            </h1>
            <p className="mt-8 text-xl text-gray-600 max-w-3xl">
              StarlineAI is designed to automate regulatory compliance checks for Indian architectural drawings. Given the fragmented, ambiguous, and jurisdiction-specific nature of building regulations in India, meaningful evaluation requires real-world data, expert review, and context-aware benchmarks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateX: 12, rotateY: -12 }}
            animate={{ opacity: 1, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 1.1 }}
            className="md:col-span-5"
          >
            <div className="h-[24rem] rounded-[3rem] overflow-hidden bg-white shadow-2xl flex items-center justify-center">
              <img
                src="/r&e.jpeg"
                alt="Research and Evaluation"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DATASET + COVERAGE */}
      <section className="max-w-7xl mx-auto mb-48">
        <div className="grid md:grid-cols-12 gap-20 items-start">
          <div className="md:col-span-4">
            <h2 className="text-4xl font-semibold tracking-tight">
              Dataset <span className="text-blue-600">Description</span>
            </h2>
            <ul className="mt-6 space-y-4 text-gray-600 text-lg">
              <li><strong>400+ real-world Indian architectural drawings</strong> spanning interiors, residential, mixed-use, and large-scale developments.</li>
              <li>Drawings reflect <strong>actual submission standards</strong>, drafting practices, and jurisdictional constraints.</li>

            </ul>

          </div>

          <div className="md:col-span-5">
            <ResponsiveContainer width="100%" height={360}>
              <RadarChart data={coverageData} outerRadius={140} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#334155", fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} />
                <Radar
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.25}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              Relative depth of regulatory rule coverage across major compliance domains.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            {["National Building Code", "State-level regulations", "Municipal by-laws", "Zoning and land-use rules"].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.04 }}>
                <div className="p-5 rounded-2xl bg-white shadow-md text-gray-700 font-medium">
                  {item}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY + FLOW */}
      <section className="max-w-7xl mx-auto mb-48">
        <div className="grid md:grid-cols-12 gap-20">
          <div className="md:col-span-5">
            <h2 className="text-4xl font-semibold tracking-tight">
              Evaluation <span className="text-blue-600">Methodology</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Performance was assessed using a <strong>human-in-the-loop evaluation framework</strong>, where experienced architects manually reviewed drawings and compared their findings against StarlineAI outputs. Each detected issue was classified as a <strong>correct detection</strong>, <strong>false positive</strong>, or <strong>missed issue</strong>, with human review serving as the reference baseline reflecting real professional compliance workflows.
            </p>
          </div>

          <div className="md:col-span-7">
            <ResponsiveContainer width="100%" height={340}>
              <AreaChart data={issueFlowData}>
                <XAxis dataKey="step" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              Cumulative progression of identified compliance issues through the automated detection and human review pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* PERFORMANCE METRICS */}
      <section className="max-w-7xl mx-auto mb-48">
        <h2 className="text-4xl font-semibold tracking-tight mb-6">
          Performance <span className="text-blue-600">Metrics</span>
        </h2>
        <p className="max-w-3xl text-gray-600 mb-16">
          In comparative evaluations, a human reviewer typically identified approximately 80 compliance issues per drawing. StarlineAI identified 75 to 76 issues on average, of which 71 to 72 were confirmed as correct detections after filtering false positives.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          <Card className="bg-white shadow-lg rounded-3xl p-6">
            <h3 className="text-sm uppercase tracking-wider text-blue-600 mb-4">Detection Quality</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={accuracyData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-gray-600">
              Recall approximately 94 percent, precision between 93 and 95 percent, with a false negative rate of 6 to 7 percent.
            </p>
          </Card>

          <Card className="bg-white shadow-lg rounded-3xl p-6">
            <h3 className="text-sm uppercase tracking-wider text-blue-600 mb-4">Time to Compliance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={timeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-gray-600">
              Automated checks reduce basic compliance review time from approximately 10 minutes to 3–4 minutes per drawing.
            </p>
          </Card>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <p className="text-sm uppercase tracking-wider opacity-90">Overall Accuracy</p>
            <p className="mt-4 text-6xl font-semibold">90–92%</p>
            <p className="mt-3 opacity-90 text-sm">
              Observed accuracy in controlled evaluations. Results vary by drawing quality, jurisdiction, and rule complexity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LIMITATIONS */}
      <section className="max-w-6xl mx-auto mb-32">
        <h2 className="text-3xl font-semibold tracking-tight mb-6">
          Failure Modes and Limitations
        </h2>
        <p className="max-w-3xl text-gray-600 mb-10">
          While StarlineAI demonstrates strong performance, certain regulatory and contextual limitations remain inherent to automated compliance analysis.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Ambiguous or subjective code language", "City-specific regulatory edge cases", "Dependence on drawing quality and annotation standards", "Conservative flagging for borderline issues", "Not a statutory municipal approval authority"].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white shadow-md text-gray-700"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENCHMARKING */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-6">
          Benchmarking Context
        </h2>
        <p className="text-gray-600">
          There is currently no publicly available global benchmark for automated building code compliance systems. StarlineAI’s evaluation approach emphasizes transparency, real-world data, and India-specific regulatory contexts.
        </p>
      </section>

    </div>
  );
}
