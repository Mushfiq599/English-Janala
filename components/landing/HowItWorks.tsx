"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiEdit3, FiBookOpen, FiTarget } from "react-icons/fi";

const steps = [
  {
    number: "01",
    icon: <FiEdit3 size={32} />,
    title: "Create your account",
    description:
      "Sign up in seconds. Tell us your age and we will personalize your entire learning experience — from theme to lesson difficulty.",
    accent: "#f59e0b",
  },
  {
    number: "02",
    icon: <FiBookOpen size={32} />,
    title: "Pick a lesson",
    description:
      "Browse lessons from Basic Vocabulary all the way to IELTS and TOEFL level. Each lesson is packed with words, meanings, examples, and audio.",
    accent: "#0ea5e9",
  },
  {
    number: "03",
    icon: <FiTarget size={32} />,
    title: "Learn and practice",
    description:
      "Read, listen, save, and quiz yourself. Track your progress and come back to review your saved words anytime.",
    accent: "#22c55e",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section style={{ backgroundColor: "var(--bg-card)" }} className="py-24" ref={ref}>
      <div className="w-11/12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span
            style={{ color: "var(--accent)", backgroundColor: "var(--accent-soft)" }}
            className="text-sm font-semibold px-4 py-1.5 rounded-full"
          >
            Simple as 1-2-3
          </span>
          <h2 style={{ color: "var(--text-primary)" }} className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            How English Janala works
          </h2>
          <p style={{ color: "var(--text-secondary)" }} className="text-lg max-w-xl mx-auto">
            Getting started takes less than a minute. Here is how your journey begins.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line desktop only */}
          <div
            style={{ backgroundColor: "var(--border-color)" }}
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              <div
                style={{
                  backgroundColor: step.accent,
                  color: "#ffffff",
                  boxShadow: `0 0 0 8px ${step.accent}20`,
                }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 z-10"
              >
                {step.icon}
              </div>
              <span style={{ color: step.accent }} className="text-xs font-bold tracking-widest uppercase mb-2">
                Step {step.number}
              </span>
              <h3 style={{ color: "var(--text-primary)" }} className="text-xl font-bold mb-3">
                {step.title}
              </h3>
              <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}