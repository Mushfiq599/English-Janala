"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiMap, FiCompass, FiBookOpen, FiArrowRight, FiPlay } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";

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

const tierConfig = {
  kids: {
    bg: "from-amber-50 to-yellow-100",
    accent: "#f59e0b",
    darkBg: false,
    badge: "Welcome back, Explorer!",
    badgeIcon: <FiMap size={14} />,
    headingPrefix: "Ready for your next",
    highlight: "Word Adventure?",
    description:
      "You are doing amazing! Pick up where you left off and collect more treasure words today.",
    primaryCta: "Continue Learning",
    primaryHref: "/lesson",
    secondaryCta: "Take a Quiz",
    secondaryHref: "/quiz",
  },
  teen: {
    bg: "from-slate-900 to-cyan-950",
    accent: "#06b6d4",
    darkBg: true,
    badge: "Welcome back!",
    badgeIcon: <FiCompass size={14} />,
    headingPrefix: "Keep building your",
    highlight: "Vocabulary Edge",
    description:
      "Every word you learn gets you closer to your goals. Jump back in and keep the momentum going.",
    primaryCta: "Continue Learning",
    primaryHref: "/lesson",
    secondaryCta: "Test Yourself",
    secondaryHref: "/quiz",
  },
  scholar: {
    bg: "from-sky-50 to-blue-100",
    accent: "#0ea5e9",
    darkBg: false,
    badge: "Welcome back, Scholar!",
    badgeIcon: <FiBookOpen size={14} />,
    headingPrefix: "Continue your path to",
    highlight: "English Mastery",
    description:
      "Your IELTS and TOEFL preparation is ongoing. Review your saved words or continue with the next lesson.",
    primaryCta: "Continue Learning",
    primaryHref: "/lesson",
    secondaryCta: "Review Saved Words",
    secondaryHref: "/saved",
  },
};

export default function HeroSlider() {
  const { user } = useAuth();
  const { profile, themeTier, loading } = useProfile();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto advance — only for logged out slider
  useEffect(() => {
    if (user) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [user]);

  // Keyboard navigation
  useEffect(() => {
    if (user) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [user]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Logged in — show personalized hero
  if (user && !loading) {
    const config = tierConfig[themeTier];
    const firstName = profile?.name?.split(" ")[0] ?? "there";

    return (
      <section
        className={`bg-gradient-to-br ${config.bg} transition-all duration-700 min-h-[70vh] flex items-center`}
      >
        <div className="w-11/12 max-w-6xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col-reverse md:flex-row items-center gap-12"
          >
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  backgroundColor: config.accent + "20",
                  color: config.accent,
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              >
                {config.badgeIcon}
                {config.badge}
              </motion.span>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${
                  config.darkBg ? "text-white" : "text-gray-900"
                }`}
              >
                Hey {firstName},{" "}
                <span style={{ color: config.accent }}>
                  {config.highlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-lg mb-8 leading-relaxed max-w-lg ${
                  config.darkBg ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {config.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <Link
                  href={config.primaryHref}
                  style={{ backgroundColor: config.accent }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white font-bold rounded-xl hover:opacity-90 transition"
                >
                  <FiPlay size={15} />
                  {config.primaryCta}
                </Link>
                <Link
                  href={config.secondaryHref}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 font-bold rounded-xl border-2 transition ${
                    config.darkBg
                      ? "border-current text-cyan-400 hover:bg-cyan-400/10"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {config.secondaryCta}
                  <FiArrowRight size={15} />
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
                src="/assets/hero-student.png"
                alt="Keep learning"
                width={420}
                height={420}
                priority
                className="drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Logged out — original slider
  const slide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section
      className={`bg-gradient-to-br ${slide.bg} transition-all duration-700 min-h-[90vh] flex items-center`}
    >
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
                style={{
                  backgroundColor: slide.accent + "20",
                  color: slide.accent,
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              >
                {slide.badgeIcon}
                {slide.badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${
                  slide.darkBg ? "text-white" : "text-gray-900"
                }`}
              >
                {slide.heading}{" "}
                <span style={{ color: slide.accent }}>{slide.highlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-lg mb-8 leading-relaxed max-w-lg ${
                  slide.darkBg ? "text-slate-300" : "text-gray-600"
                }`}
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
        <p
          style={{ color: slide.darkBg ? "#94a3b8" : "#9ca3af" }}
          className="text-center text-xs mt-4"
        >
          Use arrow keys to navigate slides
        </p>
      </div>
    </section>
  );
}