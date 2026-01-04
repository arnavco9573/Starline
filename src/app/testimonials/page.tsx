
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Linkedin } from "lucide-react";
import Image from "next/image";

// Starline users: architects, design studios, builders, compliance consultants
// Tone: practical, Indian construction context, non-marketing, lived experience

const testimonials = [
  {
    company: "Mid-size Architecture Studio · Bengaluru",
    quote:
      "\"Before Starline, compliance checks happened at the very end — and that’s where everything broke. Now we run drawings through it while drafting. It catches FAR, setbacks, and small misses we’d usually find weeks later. That alone has saved us multiple revisions per project.\"",
    name: "Principal Architect",
    title: "15+ years practice",
    avatar: "/Architect1.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    company: "Real Estate Developer · NCR",
    quote:
      "\"Municipal feedback used to feel unpredictable. One comment could send the whole plan back. With Starline, our submissions go in cleaner. Review cycles are shorter, and conversations with consultants are far more concrete because everyone’s looking at the same flagged issues.\"",
    name: "Project Head",
    title: "Residential Developments",
    avatar: "/engineer1.jpg",
    linkedin: "https://linkedin.com",
  },
  {
    company: "Urban Planning Consultant · Maharashtra",
    quote:
      "\"What surprised us was how specific the checks are to Indian rules. This isn’t generic automation. It understands local codes, zoning logic, and how approvals actually work on the ground. That’s what makes it usable, not just impressive.\"",
    name: "Compliance Lead",
    title: "Planning & Approvals",
    avatar: "/man1.jpg",
    linkedin: "https://linkedin.com",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 8200); // slower, more readable

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="relative py-32 bg-neutral-50 overflow-hidden">
      {/* subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)] bg-[size:24px_24px] opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-xs tracking-widest text-lime-600 uppercase mb-4"
        >
          Used in real projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold leading-tight uppercase"
        >
          Top architects, engineers & developers get results.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-neutral-600 mt-5 max-w-2xl mx-auto"
        >
          Starline is used by design teams who deal with Indian building codes
          every day — not as a final check, but as part of how drawings are made.
        </motion.p>

        <div className="relative mt-24 flex justify-center h-[380px]">
          <AnimatePresence>
            {[0, 1, 2].map((offset) => {
              const t = testimonials[(index + offset) % testimonials.length];

              return (
                <motion.div
                  key={index + offset}
                  initial={{ opacity: 0, y: 70, rotate: -5, scale: 0.9 }}
                  animate={{
                    opacity: 1 - offset * 0.22,
                    y: offset * 26,
                    scale: 1 - offset * 0.065,
                    rotate: offset * -4,
                    x: offset * 10,
                  }}
                  exit={{ opacity: 0, y: -90, rotate: 8, scale: 0.88 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute"
                  style={{ zIndex: 10 - offset }}
                >
                  {/* visible back card corners */}
                  {offset > 0 && (
                    <div className="absolute inset-0 rounded-2xl bg-neutral-200 translate-x-2 translate-y-2 -z-10" />
                  )}

                  <Card
                    onClick={() => {
                      setPaused(true);
                      setTimeout(() => setPaused(false), 10000);
                    }}
                    className="w-[360px] md:w-[440px] shadow-2xl rounded-2xl bg-white cursor-pointer transition-shadow hover:shadow-xl">
                    {/* pin */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-6 bg-neutral-200 rounded-full shadow-inner" />

                    <CardContent className="p-9 text-left">
                      <p className="text-xs text-neutral-500 mb-3">
                        {t.company}
                      </p>

                      <p className="text-neutral-800 text-sm leading-relaxed mb-10 italic">
                        {t.quote}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={t.avatar}
                              alt={t.name}
                              fill
                              className="object-cover grayscale"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{t.name}</p>
                            <p className="text-xs text-neutral-500">
                              {t.title}
                            </p>
                          </div>
                        </div>

                        <a
                          href={t.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md border hover:bg-neutral-100 transition"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
