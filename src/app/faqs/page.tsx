"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenLine, Send, ChevronDown, CheckCircle } from "lucide-react";

const faqs = [
  { q: "What is Starline AI?", a: "Starline AI is India’s first AI-powered building code compliance engine. It reviews architectural, structural, and MEP drawings and flags regulatory violations early, helping teams avoid rework, approval delays, and costly redesign cycles." },
  { q: "Who is Starline AI built for?", a: "Starline is built for architects, interior designers, civil and structural engineers, builders, developers, and design consultancies who want to self-check compliance before submitting drawings to authorities." },
  { q: "Which building codes and regions does Starline support?", a: "Starline performs in-depth compliance audits for all Indian metro cities. For non-metro regions, it currently checks drawings against national and state-level regulations, including NBC standards." },
  { q: "Does Starline support interior design projects?", a: "Yes. Starline supports interior projects and checks them against applicable planning, safety, and regulatory norms where relevant." },
  { q: "Does Starline support mixed-use developments?", a: "Yes. Starline supports mixed-use projects and applies the appropriate compliance logic based on building use, occupancy, and applicable regulations." },
  { q: "How does Starline AI work?", a: "Users upload PDF drawings and select the appropriate workflow. Starline vectorizes the drawings and runs AI-based compliance checks, producing marked drawings and a clause-referenced compliance report." },
  { q: "How accurate is Starline compared to manual checks?", a: "Starline has demonstrated 94% recall and 91% overall accuracy in internal evaluations. Manual checks are slower and often inconsistent due to human oversight and interpretation differences." },
  { q: "How long does a compliance check take?", a: "A typical compliance check takes around 7 minutes, with most reviews completing between 6 and 10 minutes depending on project complexity." },
  { q: "What kind of results does Starline provide?", a: "Starline provides a compliance score, detailed violation flags, suggested corrections, and exact references to the relevant code clause, page number, and paragraph for quick human verification." },
  { q: "Can I export the compliance report?", a: "Yes. Users can export the full compliance report as a PDF for internal reviews, documentation, or submission workflows." },
  { q: "Can Starline replace consultants or approval authorities?", a: "No. Starline is designed to assist professionals by catching issues early. Final approvals and professional judgment remain with consultants and regulatory authorities." },
  { q: "How much time and cost can Starline save?", a: "Industry data shows architects spend 25–40% of their time on compliance checks, while 40–60% of drawings are returned for corrections. Starline reduces rework and approval delays by identifying violations early." },
  { q: "How is Starline different from rule-based compliance tools?", a: "Most tools are rule-based and built for authorities after submission. Starline is AI-native, built for Indian architects and consultants to self-check compliance during the drafting stage." },
  { q: "Is my data secure on Starline?", a: "Yes. Starline uses cryptographic protections to ensure that drawings remain private and accessible only to the user. Even Starline’s internal team cannot view your data." },
  { q: "What pricing model does Starline follow?", a: "Starline offers flexible pricing starting at ₹399, scaling up to enterprise subscriptions that can go up to ₹1 lakh. Pricing may be per month or per drawing depending on the plan and usage." },
  { q: "Is Starline AI publicly available?", a: "Starline AI is currently available through a demo-first process. After the demo, eligible users can onboard and purchase the enterprise version." },
  { q: "How defensible is Starline’s technology?", a: "Starline is built on proprietary, patented technology that combines custom AI models with India-specific regulatory intelligence." },
  { q: "What gives Starline a long-term competitive advantage?", a: "Starline is built by Indian architects, domain experts, and technologists with experience across multiple states, building laws, and prior legal-tech startups, making the system difficult to replicate." },
  { q: "When do paid plans go live?", a: "Starline is currently in a controlled beta with select firms. Paid plans will roll out immediately after this phase, starting with pilot engagements and expanding into standard subscriptions." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSend = () => {
    if (!question || !email || status !== "idle") return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 2600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-20">
          <span className="inline-block mb-4 rounded-full bg-sky-100 px-4 py-1 text-sm text-sky-700">Starline AI • Help Center</span>
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight max-w-4xl">
            Everything You Need to Know About <span className="text-sky-600">AI Building Code Compliance</span>
          </h1>
          <h2 className="sr-only">Frequently Asked Questions</h2>
          <p className="mt-6 text-gray-600 max-w-3xl">
            Clear Verified Answers From Starline Team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ List */}
          <div className="lg:col-span-2 space-y-4">
            {faqs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Card className="rounded-2xl border border-sky-100 bg-white/80 backdrop-blur">
                  <CardContent className="p-0">
                    <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                      <span className="text-gray-900 font-medium pr-6">{item.q}</span>
                      <ChevronDown className={`text-sky-600 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="px-6 pb-6 text-gray-600 leading-relaxed">
                          {item.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Ask a Question */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <Card className="rounded-3xl shadow-xl sticky top-24 bg-gradient-to-b from-white to-sky-50 border border-sky-100">
              <CardContent className="p-7">
                <div className="flex items-center gap-2 mb-4">
                  <PenLine className="text-sky-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Ask Starline</h3>
                </div>

                {status === "sent" ? (
                  <div className="flex flex-col items-center text-center gap-3 py-14">
                    <CheckCircle className="text-green-500" size={40} />
                    <p className="text-gray-800 font-medium">Your question is submitted</p>
                    <p className="text-sm text-gray-500">Our team will respond to you by email.</p>
                  </div>
                ) : (
                  <>
                    <input type="email" placeholder="Your work email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 rounded-xl border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-sky-400" />
                    <textarea placeholder="Type your question here…" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full h-28 rounded-xl border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-sky-400" />
                    <Button onClick={handleSend} disabled={status !== "idle"} className="w-full mt-4 rounded-xl bg-sky-600 hover:bg-sky-700">
                      {status === "sending" ? "Processing…" : "Send Question"}
                      <Send size={16} className="ml-2" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
