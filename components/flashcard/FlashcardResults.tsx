"use client";

import { motion } from "framer-motion";
import { FiRefreshCw, FiBookOpen, FiCheck, FiRotateCcw } from "react-icons/fi";
import { useProfile } from "@/context/ProfileContext";
import Confetti from "@/components/shared/Confetti";

interface Props {
    gotIt: number;
    reviewAgain: number;
    lessonName: string;
    onReviewMissed: () => void;
    onRestartAll: () => void;
    onBack: () => void;
}

export default function FlashcardResults({
    gotIt,
    reviewAgain,
    lessonName,
    onReviewMissed,
    onRestartAll,
    onBack,
}: Props) {
    const { themeTier } = useProfile();
    const total = gotIt + reviewAgain;
    const percentage = Math.round((gotIt / total) * 100);
    const perfect = reviewAgain === 0;

    const getMessage = () => {
        if (perfect)
            return themeTier === "kids"
                ? "Amazing! You knew every word!"
                : "Perfect session! You knew all the words.";
        if (percentage >= 80)
            return themeTier === "kids"
                ? "Great job! Almost there!"
                : "Strong session. A few more to master.";
        if (percentage >= 50)
            return themeTier === "kids"
                ? "Good try! Keep practising!"
                : "Good effort. Review the missed words to strengthen your recall.";
        return themeTier === "kids"
            ? "Keep going! Practice makes perfect!"
            : "Keep studying. Repetition is the key to retention.";
    };

    return (
        <>
            <Confetti active={perfect && themeTier === "kids"} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md mx-auto text-center"
            >
                {/* Score card */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-3xl p-10 mb-6 shadow-sm"
                >
                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div
                            style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac" }}
                            className="border-2 rounded-2xl p-4"
                        >
                            <div className="flex items-center justify-center mb-2">
                                <FiCheck size={24} className="text-green-500" />
                            </div>
                            <p className="text-3xl font-black text-green-600 mb-1">
                                {gotIt}
                            </p>
                            <p className="text-xs font-bold text-green-600">Got It</p>
                        </div>
                        <div
                            style={{ backgroundColor: "#fef2f2", borderColor: "#fca5a5" }}
                            className="border-2 rounded-2xl p-4"
                        >
                            <div className="flex items-center justify-center mb-2">
                                <FiRotateCcw size={24} className="text-red-400" />
                            </div>
                            <p className="text-3xl font-black text-red-500 mb-1">
                                {reviewAgain}
                            </p>
                            <p className="text-xs font-bold text-red-400">
                                Review Again
                            </p>
                        </div>
                    </div>

                    {/* Percentage bar */}
                    <div
                        style={{ backgroundColor: "var(--border-color)" }}
                        className="w-full h-3 rounded-full overflow-hidden mb-4"
                    >
                        <motion.div
                            className="h-full rounded-full bg-green-500"
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

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    {reviewAgain > 0 && (
                        <button
                            onClick={onReviewMissed}
                            style={{ backgroundColor: "var(--accent)" }}
                            className="flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl hover:opacity-90 transition"
                        >
                            <FiRotateCcw size={16} />
                            Review {reviewAgain} Missed Word{reviewAgain !== 1 ? "s" : ""}
                        </button>
                    )}
                    <button
                        onClick={onRestartAll}
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                            color: "var(--text-primary)",
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 border font-bold rounded-xl hover:opacity-80 transition"
                    >
                        <FiRefreshCw size={16} />
                        Restart All Cards
                    </button>
                    <button
                        onClick={onBack}
                        style={{ color: "var(--text-muted)" }}
                        className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium hover:opacity-70 transition"
                    >
                        <FiBookOpen size={15} />
                        Pick Another Lesson
                    </button>
                </div>
            </motion.div>
        </>
    );
}