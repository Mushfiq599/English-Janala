"use client";

import { motion } from "framer-motion";
import { ExamPack } from "@/lib/examWords";
import { FiArrowRight, FiBook } from "react-icons/fi";

interface Props {
    pack: ExamPack;
    index: number;
    onSelect: (pack: ExamPack) => void;
}

const levelLabels: Record<string, string> = {
    awl: "Academic Word List",
    ielts: "IELTS",
    toefl: "TOEFL",
};

export default function ExamPackCard({ pack, index, onSelect }: Props) {
    return (
        <motion.button
            onClick={() => onSelect(pack)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
            }}
            className="border rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition flex flex-col gap-4 w-full"
        >
            {/* Icon + level badge */}
            <div className="flex items-start justify-between">
                <div
                    style={{ backgroundColor: pack.bg, color: pack.color }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                >
                    <FiBook size={22} />
                </div>
                <span
                    style={{ backgroundColor: pack.bg, color: pack.color }}
                    className="text-xs font-bold px-3 py-1 rounded-full"
                >
                    {levelLabels[pack.level]}
                </span>
            </div>

            {/* Info */}
            <div>
                <h3
                    style={{ color: "var(--text-primary)" }}
                    className="text-lg font-bold mb-1"
                >
                    {pack.title}
                </h3>
                <p style={{ color: pack.color }} className="text-xs font-semibold mb-2">
                    {pack.subtitle}
                </p>
                <p
                    style={{ color: "var(--text-secondary)" }}
                    className="text-sm leading-relaxed"
                >
                    {pack.description}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-3"
                style={{ borderColor: "var(--border-color)", borderTopWidth: 1 }}
            >
                <span style={{ color: "var(--text-muted)" }} className="text-sm">
                    {pack.words.length} words
                </span>
                <div
                    style={{ backgroundColor: pack.color, color: "#fff" }}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                    Study Now
                    <FiArrowRight size={12} />
                </div>
            </div>
        </motion.button>
    );
}