"use client";

import { motion } from "framer-motion";
import { FiMapPin, FiCheck } from "react-icons/fi";

interface Props {
  label: string;
  seen: number;
  isActive: boolean;
  onClick: () => void;
  tier: "kids" | "teen" | "scholar";
  index: number;
}

export default function LessonPinButton({
  label,
  seen,
  isActive,
  onClick,
  tier,
  index,
}: Props) {
  if (tier === "scholar") {
    return (
      <motion.button
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        style={{
          backgroundColor: isActive ? "var(--accent)" : "var(--bg-card)",
          borderColor: isActive ? "var(--accent)" : "var(--border-color)",
          color: isActive ? "#ffffff" : "var(--accent)",
        }}
        className="rounded-xl py-3 px-2 text-sm font-semibold transition border-2 flex flex-col items-center gap-1"
      >
        <span>{label}</span>
        {seen > 0 && (
          <span
            style={{
              backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "var(--accent-soft)",
              color: isActive ? "#ffffff" : "var(--accent)",
            }}
            className="text-xs font-normal px-2 py-0.5 rounded-full"
          >
            {seen} seen
          </span>
        )}
      </motion.button>
    );
  }

  // Kids and Teen — map pin style
  const pinColor = tier === "kids"
    ? isActive ? "#d97706" : "#f59e0b"
    : isActive ? "#0891b2" : "#06b6d4";

  const bgColor = tier === "kids"
    ? isActive ? "#fef3c7" : "#ffffff"
    : isActive ? "#164e63" : "#1e293b";

  const textColor = tier === "kids"
    ? isActive ? "#92400e" : "#78716c"
    : isActive ? "#e2e8f0" : "#94a3b8";

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 group"
    >
      {/* Pin head */}
      <div
        style={{
          backgroundColor: bgColor,
          borderColor: pinColor,
          boxShadow: isActive ? `0 0 0 4px ${pinColor}30` : "none",
        }}
        className="relative w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center transition-all"
      >
        <FiMapPin
          size={20}
          style={{ color: pinColor }}
        />
        {seen > 0 && (
          <div
            style={{ backgroundColor: "#22c55e" }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
          >
            <FiCheck size={10} color="#fff" />
          </div>
        )}
      </div>

      {/* Label */}
      <span
        style={{ color: textColor }}
        className={`text-xs font-semibold text-center leading-tight max-w-[80px] ${
          tier === "kids" ? "font-bold" : ""
        }`}
      >
        {label}
      </span>

      {/* Seen count */}
      {seen > 0 && (
        <span
          style={{
            backgroundColor: pinColor + "20",
            color: pinColor,
          }}
          className="text-xs px-2 py-0.5 rounded-full font-medium"
        >
          {seen} seen
        </span>
      )}
    </motion.button>
  );
}