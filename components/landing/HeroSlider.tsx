"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiMap, FiCompass, FiBookOpen, FiArrowRight } from "react-icons/fi";

const slides = [
  {
    id: 0,
    badgeIcon: <FiMap size={14} />,
    badge: "For Young Explorers",
    heading: "Learn English the",
    highlight: "Fun Way!",
    description:
      "Go on a word adventure! Collect treasure words, solve fun quizzes, and become an English champion. Perfect for kids who love to explore!",
    cta: "Start Adventure",
    href: "/signup",
    image: "/assets/hero-student.png",
    bg: "from-amber-50 to-yellow-100",
    darkBg: false,
    accent: "#f59e0b",
  },
  {
    id: 1,
    badgeIcon: <FiCompass size={14} />,
    badge: "For Teen Explorers",
    heading: "Level Up Your",
    highlight: "English Skills",
    description:
      "Master vocabulary, ace your exams, and sound fluent. Interactive lessons designed for teens who want to get ahead.",
    cta: "Start Learning",
    href: "/signup",
    image: "/assets/hero-student.png",
    bg: "from-slate-900 to-cyan-950",
    darkBg: true,
    accent: "#06b6d4",
  },
  {
    id: 2,
    badgeIcon: <FiBookOpen size={14} />,
    badge: "For IELTS and TOEFL",
    heading: "Master English for",
    highlight: "Global Success",
    description:
      "Structured vocabulary lessons tailored for IELTS and TOEFL preparation. Build the word power you need to achieve your target score.",
    cta: "Begin Preparation",
    href: "/signup",
    image: "/assets/hero-student.png",
    bg: "from-sky-50 to-blue-100",
    darkBg: false,
    accent: "#0ea5e9",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className={`bg-gradient-to-br ${slide.bg} transition-all duration-700 min-h-[90vh] flex items-center`}>
      <div className="w-11/12 max-w-6xl mx-auto py-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col-reverse md:flex-row items-center gap-12"
          >
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ backgroundColor: slide.accent + "20", color: slide.accent }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              >
                {slide.badgeIcon}
                {slide.badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${slide.darkBg ? "text-white" : "text-gray-900"}`}
              >
                {slide.heading}{" "}
                <span style={{ color: slide.accent }}>{slide.highlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-lg mb-8 leading-relaxed max-w-lg ${slide.darkBg ? "text-slate-300" : "text-gray-600"}`}
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <Link
                  href={slide.href}
                  style={{ backgroundColor: slide.accent }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white font-bold rounded-xl hover:opacity-90 transition"
                >
                  {slide.cta}
                  <FiArrowRight size={16} />
                </Link>
                <Link
                  href="/lesson"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 font-bold rounded-xl border-2 transition ${
                    slide.darkBg
                      ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FiBookOpen size={16} />
                  Browse Lessons
                </Link>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1 flex justify-center"
            >
              <Image
                src={slide.image}
                alt="Learning English"
                width={480}
                height={480}
                priority
                className="drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                backgroundColor: i === current ? slide.accent : "#d1d5db",
                width: i === current ? "2rem" : "0.75rem",
              }}
              className="h-3 rounded-full transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}