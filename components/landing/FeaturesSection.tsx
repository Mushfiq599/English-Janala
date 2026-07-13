"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FiMap,
  FiVolume2,
  FiStar,
  FiTrendingUp,
  FiTarget,
  FiAward,
} from "react-icons/fi";

const features = [
  {
    icon: <FiMap size={28} />,
    title: "Lesson-by-Lesson Journey",
    description:
      "Progress through carefully structured lessons from basic to advanced vocabulary. Every lesson builds on the last.",
    accent: "#f59e0b",
    bg: "#fef9c3",
  },
  {
    icon: <FiVolume2 size={28} />,
    title: "Native Pronunciation",
    description:
      "Hear every word spoken in natural English. Practice until your pronunciation is perfect with instant audio feedback.",
    accent: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    icon: <FiStar size={28} />,
    title: "Personal Word Collection",
    description:
      "Save words you want to remember. Build your own vocabulary list and review it anytime, anywhere.",
    accent: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    icon: <FiTrendingUp size={28} />,
    title: "Progress Tracking",
    description:
      "See exactly how many words you have learned in each lesson. Watch your progress grow every day.",
    accent: "#22c55e",
    bg: "#f0fdf4",
  },
  {
    icon: <FiTarget size={28} />,
    title: "Quiz Mode",
    description:
      "Test your knowledge with interactive quizzes. Multiple choice, fill-in-the-blank, and more.",
    accent: "#ef4444",
    bg: "#fef2f2",
  },
  {
    icon: <FiAward size={28} />,
    title: "Leaderboard",
    description:
      "Compete with learners worldwide. Climb the ranks and earn your place at the top.",
    accent: "#f97316",
    bg: "#fff7ed",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section style={{ backgroundColor: "var(--bg-page)" }} className="py-24" ref={ref}>
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
            Everything you need
          </span>
          <h2 style={{ color: "var(--text-primary)" }} className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Learn smarter, not harder
          </h2>
          <p style={{ color: "var(--text-secondary)" }} className="text-lg max-w-2xl mx-auto">
            English Janala gives you all the tools to master English vocabulary —
            whether you are 5 or 30, a beginner or an exam candidate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
              className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div
                style={{ backgroundColor: feature.bg, color: feature.accent }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              >
                {feature.icon}
              </div>
              <h3 style={{ color: "var(--text-primary)" }} className="text-lg font-bold mb-2">
                {feature.title}
              </h3>
              <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}