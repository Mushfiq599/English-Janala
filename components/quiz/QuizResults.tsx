"use client";

import { motion } from "framer-motion";
import { FiRefreshCw, FiBookOpen, FiAward } from "react-icons/fi";
import { useProfile } from "@/context/ProfileContext";
import Confetti from "@/components/shared/Confetti";

interface Props {
    score: number;
    total: number;
    lessonName: string;
    onRetry: () => void;
    onBack: () => void;
}

export default function QuizResults({
    score,
    total,
    lessonName,
    onRetry,
    onBack,
}: Props) {
    const { themeTier } = useProfile();
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 60;
    const perfect = percentage === 100;

    const getMessage = () => {
        if (perfect) {
            return themeTier === "kids"
                ? "Amazing! You are a word champion!"
                : "Perfect score! Outstanding work.";
        }
        if (percentage >= 80) {
            return themeTier === "kids"
                ? "Great job! You are really good at this!"
                : "Excellent result. Keep it up.";
        }
        if (percentage >= 60) {
            return themeTier === "kids"
                ? "Good try! Practice more to get better!"
                : "Good effort. Review the missed words and try again.";
        }
        return themeTier === "kids"
            ? "Keep practising! You will get better!"
            : "Keep studying. Review the lesson and try again.";
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
            <Confetti active={passed && themeTier === "kids"} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md mx-auto text-center"
            >
                {/* Score circle */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-3xl p-10 mb-6 shadow-sm"
                >
                    <div className="flex justify-center mb-4">
                        <FiAward size={40} style={{ color: scoreColor }} />
                    </div>

                    <div
                        style={{ color: scoreColor }}
                        className="text-7xl font-bold mb-2"
                    >
                        {score}/{total}
                    </div>

                    <div
                        style={{ color: "var(--text-muted)" }}
                        className="text-lg mb-6"
                    >
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
                        className="text-lg font-semibold mb-1"
                    >
                        {getMessage()}
                    </p>
                    <p style={{ color: "var(--text-muted)" }} className="text-sm">
                        {lessonName}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onRetry}
                        style={{ backgroundColor: "var(--accent)" }}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl hover:opacity-90 transition"
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
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border font-bold rounded-xl hover:opacity-80 transition"
                    >
                        <FiBookOpen size={16} />
                        Pick Another Lesson
                    </button>
                </div>
            </motion.div>
        </>
    );
}