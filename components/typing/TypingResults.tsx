"use client";

import { motion } from "framer-motion";
import {
    FiRefreshCw,
    FiBookOpen,
    FiCheck,
    FiX,
} from "react-icons/fi";
import { useProfile } from "@/context/ProfileContext";
import Confetti from "@/components/shared/Confetti";

interface MissedWord {
    word: string;
    typed: string;
    meaning: string;
}

interface Props {
    correct: number;
    total: number;
    lessonName: string;
    missedWords: MissedWord[];
    onRetry: () => void;
    onBack: () => void;
}

export default function TypingResults({
    correct,
    total,
    lessonName,
    missedWords,
    onRetry,
    onBack,
}: Props) {
    const { themeTier } = useProfile();
    const percentage = Math.round((correct / total) * 100);
    const perfect = correct === total;

    const getMessage = () => {
        if (perfect)
            return themeTier === "kids"
                ? "Wow! You spelled every word correctly!"
                : "Flawless! Every word typed correctly.";
        if (percentage >= 80)
            return themeTier === "kids"
                ? "Amazing! Just a few more to practise!"
                : "Strong result. Review the missed words to reach 100%.";
        if (percentage >= 60)
            return themeTier === "kids"
                ? "Good try! Keep practising!"
                : "Decent effort. The typing challenge is tough — keep at it.";
        return themeTier === "kids"
            ? "Keep going! You will get better!"
            : "Keep practising. Typing builds stronger recall than multiple choice.";
    };

    const scoreColor = perfect
        ? "#22c55e"
        : percentage >= 80
            ? "#0ea5e9"
            : percentage >= 60
                ? "#f59e0b"
                : "#ef4444";

    return (
        <>
            <Confetti active={perfect && themeTier === "kids"} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl mx-auto"
            >
                {/* Score card */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-3xl p-8 mb-6 shadow-sm text-center"
                >
                    <div
                        style={{ color: scoreColor }}
                        className="text-6xl font-black mb-2"
                    >
                        {correct}/{total}
                    </div>
                    <div style={{ color: "var(--text-muted)" }} className="text-lg mb-6">
                        {percentage}% correct
                    </div>

                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="w-full h-3 rounded-full overflow-hidden mb-6"
                    >
                        <motion.div
                            style={{ backgroundColor: scoreColor }}
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        />
                    </div>

                    <p
                        style={{ color: "var(--text-primary)" }}
                        className="text-lg font-bold mb-1"
                    >
                        {getMessage()}
                    </p>
                    <p style={{ color: "var(--text-muted)" }} className="text-sm">
                        {lessonName}
                    </p>
                </div>

                {/* Missed words review */}
                {missedWords.length > 0 && (
                    <div
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                        }}
                        className="border rounded-2xl p-6 mb-6 shadow-sm"
                    >
                        <h3
                            style={{ color: "var(--text-primary)" }}
                            className="font-bold mb-4"
                        >
                            Words to review ({missedWords.length})
                        </h3>
                        <div className="flex flex-col gap-3">
                            {missedWords.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    style={{ borderColor: "var(--border-color)" }}
                                    className="flex items-start gap-3 border rounded-xl p-3"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                style={{ color: "var(--text-primary)" }}
                                                className="font-bold text-sm"
                                            >
                                                {item.word}
                                            </span>
                                            <FiCheck
                                                size={14}
                                                className="text-green-500"
                                            />
                                        </div>
                                        {item.typed && (
                                            <div className="flex items-center gap-2">
                                                <span
                                                    style={{ color: "var(--text-muted)" }}
                                                    className="text-xs"
                                                >
                                                    You typed:
                                                </span>
                                                <span className="text-xs text-red-500 font-medium flex items-center gap-1">
                                                    <FiX size={10} />
                                                    {item.typed || "(skipped)"}
                                                </span>
                                            </div>
                                        )}
                                        <p
                                            style={{ color: "var(--text-secondary)" }}
                                            className="text-xs mt-1"
                                        >
                                            {item.meaning}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onRetry}
                        style={{ backgroundColor: "var(--accent)" }}
                        className="flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl hover:opacity-90 transition"
                    >
                        <FiRefreshCw size={16} />
                        Try Again
                    </button>
                    <button
                        onClick={onBack}
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                            color: "var(--text-primary)",
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 border font-bold rounded-xl hover:opacity-80 transition"
                    >
                        <FiBookOpen size={16} />
                        Pick Another Lesson
                    </button>
                </div>
            </motion.div>
        </>
    );
}