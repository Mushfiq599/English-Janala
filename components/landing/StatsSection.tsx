"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  FiBook,
  FiMap,
  FiTarget,
  FiGlobe,
} from "react-icons/fi";

const stats = [
  {
    value: 7,
    suffix: "",
    label: "Structured Lessons",
    sublabel: "From Basic to TOEFL level",
    icon: <FiMap size={28} />,
  },
  {
    value: 1000,
    suffix: "+",
    label: "Vocabulary Words",
    sublabel: "With meanings, examples and audio",
    icon: <FiBook size={28} />,
  },
  {
    value: 6,
    suffix: "",
    label: "Learning Modes",
    sublabel: "Lessons, Flashcards, Quiz, Typing and more",
    icon: <FiTarget size={28} />,
  },
  {
    value: 4,
    suffix: "",
    label: "Exam Packs",
    sublabel: "AWL, IELTS, TOEFL and Advanced",
    icon: <FiGlobe size={28} />,
  },
];

const features = [
  {
    name: "Riya",
    age: "Age 9",
    tier: "Young Explorer",
    tierColor: "#f59e0b",
    tierBg: "#fef9c3",
    initial: "R",
    accent: "#f59e0b",
    quote:
      "Map-pin lessons make learning feel like a real adventure. The confetti when I get everything right is the best part!",
  },
  {
    name: "Tanvir",
    age: "Age 16",
    tier: "Teen Explorer",
    tierColor: "#06b6d4",
    tierBg: "#cffafe",
    initial: "T",
    accent: "#06b6d4",
    quote:
      "The typing challenge is genuinely hard — much better than just clicking multiple choice. My vocabulary has improved noticeably.",
  },
  {
    name: "Nusrat",
    age: "Age 24",
    tier: "Scholar",
    tierColor: "#0ea5e9",
    tierBg: "#f0f9ff",
    initial: "N",
    accent: "#0ea5e9",
    quote:
      "The IELTS and TOEFL exam packs cover exactly the words that appear in the Academic Word List. Exactly what I needed for preparation.",
  },
];

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      style={{ backgroundColor: "var(--bg-page)" }}
      className="py-24"
      ref={ref}
    >
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span
            style={{
              color: "var(--accent)",
              backgroundColor: "var(--accent-soft)",
            }}
            className="text-sm font-semibold px-4 py-1.5 rounded-full"
          >
            By the numbers
          </span>
          <h2
            style={{ color: "var(--text-primary)" }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-16"
          >
            Everything you need in one place
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
              className="border rounded-2xl p-6 text-center shadow-sm"
            >
              <div
                style={{ color: "var(--accent)" }}
                className="flex justify-center mb-3"
              >
                {stat.icon}
              </div>
              <div
                style={{ color: "var(--accent)" }}
                className="text-3xl font-bold mb-1"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p
                style={{ color: "var(--text-primary)" }}
                className="text-sm font-semibold mb-1"
              >
                {stat.label}
              </p>
              <p
                style={{ color: "var(--text-muted)" }}
                className="text-xs leading-snug"
              >
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* What each tier gets section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3
            style={{ color: "var(--text-primary)" }}
            className="text-2xl font-bold"
          >
            Built for every type of learner
          </h3>
          <p
            style={{ color: "var(--text-secondary)" }}
            className="text-sm mt-2"
          >
            Your experience adapts based on your age — kids, teens, and
            adults each get a different interface tailored to them
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
              className="border rounded-2xl p-6 shadow-sm"
            >
              {/* Avatar + tier */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  style={{ backgroundColor: f.accent, color: "#fff" }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                >
                  {f.initial}
                </div>
                <div>
                  <p
                    style={{ color: "var(--text-primary)" }}
                    className="font-bold text-sm"
                  >
                    {f.name}, {f.age}
                  </p>
                  <span
                    style={{
                      backgroundColor: f.tierBg,
                      color: f.tierColor,
                    }}
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  >
                    {f.tier}
                  </span>
                </div>
              </div>

              {/* Feature highlight */}
              <p
                style={{ color: "var(--text-secondary)" }}
                className="text-sm leading-relaxed italic"
              >
                &ldquo;{f.quote}&rdquo;
              </p>

              {/* Disclaimer */}
              <p
                style={{ color: "var(--text-muted)" }}
                className="text-xs mt-3"
              >
                Illustrative example of how each tier experiences the app
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}