"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Investors() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 px-6 py-28 text-gray-900 overflow-hidden mt-1">
      <div className="mx-auto max-w-7xl relative">

        {/* Hero / Thesis */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-28 relative"
        >
          <img
            src="https://i.pinimg.com/1200x/1a/b2/fa/1ab2fab539b1bfa5538a0b8e7fe5b1b8.jpg"
            alt="Regulatory intelligence"
            className="w-full h-[420px] object-cover rounded-[40px] shadow-[0_40px_90px_rgba(0,0,0,0.18)]"
          />
          <h1 className="mt-12 text-6xl font-semibold tracking-tight text-gray-800">
            Built for Long-Term Regulatory Intelligence
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
            Starline AI is building India’s first AI-native building code compliance engine.
            As construction approvals transition toward standardized digital workflows,
            regulatory compliance is increasingly a software and data problem — requiring
            accuracy, consistency, and scale that manual processes cannot deliver.
          </p>
        </motion.div>

        {/* Why Now */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-20"
        >
          <Card className="rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(14,165,233,0.15)]">
            <CardContent className="p-10">
              <h2 className="mb-6 text-2xl font-medium tracking-tight">Why Now</h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li>• Nationwide rollout of OBPAS and digital plan approvals</li>
                <li>• Fragmented building codes that do not scale manually</li>
                <li>• Growing pressure on architects to self-validate before submission</li>
                <li>• AI adoption accelerating across AEC workflows</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Structural Problem */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-24"
        >
          <Card className="rounded-[32px] border border-white/60 bg-gradient-to-br from-white via-sky-50 to-sky-100 shadow-[0_30px_60px_rgba(14,165,233,0.18)]">
            <CardContent className="p-10">
              <h2 className="mb-6 text-2xl font-medium tracking-tight">A Structural, Not Cyclical, Problem</h2>
              <p className="max-w-4xl text-lg leading-relaxed text-gray-700">
                India’s building regulations vary across states, cities, and authorities.
                Manual review processes cannot scale with urban growth. Government tools
                operate post-submission, creating costly rework cycles. Starline shifts
                compliance upstream — into the drafting process itself.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Partner & Investor Alignment */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-28"
        >
          <h2 className="mb-10 text-2xl font-medium tracking-tight">Built With the Right Partners</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <Card className="rounded-[36px] overflow-hidden border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_30px_70px_rgba(14,165,233,0.2)]">
              <motion.img
                src="https://i.pinimg.com/1200x/65/01/f8/6501f8c2f33c7f94a3d855f0351d52ae.jpg"
                alt="Practitioner collaboration"
                className="h-64 w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <CardContent className="p-8">
                <h3 className="text-lg font-medium">Practitioner-Led Collaboration</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Starline is shaped alongside architects, consultants, and reviewers who work
                  within India’s regulatory realities — ensuring relevance, trust, and adoption.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[36px] overflow-hidden border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_30px_70px_rgba(14,165,233,0.2)]">
              <motion.img
                src="https://i.pinimg.com/1200x/50/6f/98/506f989b14aeab23c046cb1512945353.jpg"
                alt="Long-term capital alignment"
                className="h-64 w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <CardContent className="p-8">
                <h3 className="text-lg font-medium">Long-Term Capital Alignment</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  We align with investors who contribute strategic insight, governance maturity,
                  and a shared ambition to modernize India’s construction ecosystem.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Capital Alignment */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          <div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Capital Alignment</h2>
            <p className="max-w-xl text-lg leading-relaxed text-gray-700">
              Starline AI has been built as a fully bootstrapped company, driven by product depth,
              technical rigor, and close collaboration with practitioners. As we selectively open
              up to external capital, we are intentional about partnering with investors who bring
              long-term perspective, domain insight, and the conviction to help reshape India’s
              construction and regulatory landscape.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="rounded-[36px] border border-white/60 bg-white/90 backdrop-blur-xl p-12 shadow-[0_40px_90px_rgba(14,165,233,0.22)] relative"
          >
            <p className="text-xl italic font-medium leading-relaxed text-gray-800 relative pl-6">
              <span className="absolute -left-2 top-0 text-4xl text-gray-400">“</span>
              We’re redefining how building compliance works in India—at scale. If you believe AI
              should power faster approvals, better governance, and a stronger construction
              ecosystem, we’d love to connect.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold">Anuroop Arya</p>
                  <p className="text-sm text-gray-600">CEO, Starline AI</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/aaravarya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                >
                  <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold">Gourika</p>
                  <p className="text-sm text-gray-600">Managing Director, Starline AI</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/gourika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                >
                  <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
