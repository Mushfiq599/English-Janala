"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiBook, FiMap, FiStar, FiUsers } from "react-icons/fi";

const stats = [
  { value: 1000, suffix: "+", label: "Vocabulary Words", icon: <FiBook size={28} /> },
  { value: 7, suffix: "", label: "Structured Lessons", icon: <FiMap size={28} /> },
  { value: 98, suffix: "%", label: "Learner Satisfaction", icon: <FiStar size={28} /> },
  { value: 5000, suffix: "+", label: "Active Learners", icon: <FiUsers size={28} /> },
];

const testimonials = [
  {
    name: "Riya, Age 9",
    quote: "I love collecting words! My English is so much better now.",
    initials: "R",
    accent: "#f59e0b",
  },
  {
    name: "Tanvir, Age 16",
    quote: "The quiz mode really helped me improve my vocabulary for my O-Levels.",
    initials: "T",
    accent: "#06b6d4",
  },
  {
    name: "Nusrat, Age 24",
    quote: "I scored 7.5 on IELTS. The advanced lessons were exactly what I needed.",
    initials: "N",
    accent: "#0ea5e9",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
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
            By the numbers
          </span>
          <h2 style={{ color: "var(--text-primary)" }} className="text-3xl md:text-4xl font-bold mt-4">
            Trusted by learners of all ages
          </h2>
        </motion.div>

        {/* Stats */}
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
              <div style={{ color: "var(--accent)" }} className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div style={{ color: "var(--accent)" }} className="text-3xl font-bold mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 style={{ color: "var(--text-primary)" }} className="text-2xl font-bold">
            What our learners say
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
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
              <div
                style={{ backgroundColor: t.accent, color: "#fff" }}
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4"
              >
                {t.initials}
              </div>
              <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed italic mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p style={{ color: "var(--text-primary)" }} className="text-sm font-bold">
                {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}