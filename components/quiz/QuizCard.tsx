"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";
import { useProfile } from "@/context/ProfileContext";

interface Props {
    word: string;
    options: string[];
    correctAnswer: string;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (answer: string) => void;
    selectedAnswer: string | null;
}

function KidsReaction({ correct }: { correct: boolean | null }) {
    if (correct === null) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            >
                <div
                    style={{
                        backgroundColor: correct ? "#f0fdf4" : "#fef2f2",
                        border: `4px solid ${correct ? "#22c55e" : "#ef4444"}`,
                    }}
                    className="rounded-3xl p-8 flex flex-col items-center gap-2 shadow-2xl"
                >
                    <span className="text-8xl">
                        {correct ? "🌟" : "💪"}
                    </span>
                    <p
                        style={{ color: correct ? "#15803d" : "#dc2626" }}
                        className="text-2xl font-black"
                    >
                        {correct ? "Amazing!" : "Try again!"}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function QuizCard({
    word,
    options,
    correctAnswer,
    questionNumber,
    totalQuestions,
    onAnswer,
    selectedAnswer,
}: Props) {
    const { themeTier } = useProfile();
    const isKids = themeTier === "kids";

    const getOptionStyle = (option: string) => {
        if (!selectedAnswer) {
            return {
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
            };
        }
        if (option === correctAnswer) {
            return {
                backgroundColor: "#f0fdf4",
                borderColor: "#22c55e",
                color: "#15803d",
            };
        }
        if (option === selectedAnswer && option !== correctAnswer) {
            return {
                backgroundColor: "#fef2f2",
                borderColor: "#ef4444",
                color: "#dc2626",
            };
        }
        return {
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
            color: "var(--text-muted)",
            opacity: 0.5,
        };
    };

    const getOptionIcon = (option: string) => {
        if (!selectedAnswer) return null;
        if (option === correctAnswer)
            return <FiCheck size={16} className="text-green-500 flex-shrink-0" />;
        if (option === selectedAnswer && option !== correctAnswer)
            return <FiX size={16} className="text-red-500 flex-shrink-0" />;
        return null;
    };

    const isCorrect =
        selectedAnswer !== null ? selectedAnswer === correctAnswer : null;

    return (
        <>
            {/* Kids character reaction */}
            {isKids && isCorrect !== null && (
                <KidsReaction correct={isCorrect} />
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={word}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full max-w-2xl mx-auto"
                >
                    {/* Progress bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span
                                style={{ color: "var(--text-muted)" }}
                                className="text-sm font-medium"
                            >
                                Question {questionNumber} of {totalQuestions}
                            </span>
                            <span
                                style={{ color: "var(--accent)" }}
                                className="text-sm font-bold"
                            >
                                {Math.round((questionNumber / totalQuestions) * 100)}%
                            </span>
                        </div>
                        <div
                            style={{ backgroundColor: "var(--border-color)" }}
                            className="w-full h-2 rounded-full overflow-hidden"
                        >
                            <motion.div
                                style={{ backgroundColor: "var(--accent)" }}
                                className="h-full rounded-full"
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${((questionNumber - 1) / totalQuestions) * 100
                                        }%`,
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <div
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-color)",
                        }}
                        className="border rounded-2xl p-8 mb-6 text-center shadow-sm"
                    >
                        <p
                            style={{ color: "var(--accent)" }}
                            className="text-xs font-bold uppercase tracking-widest mb-3"
                        >
                            {isKids
                                ? "What does this word mean?"
                                : "What is the meaning of this word?"}
                        </p>
                        <h2
                            style={{ color: "var(--text-primary)" }}
                            className={`font-bold tracking-wide ${isKids ? "text-5xl" : "text-4xl"
                                }`}
                        >
                            {word}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {options.map((option, i) => (
                            <motion.button
                                key={i}
                                onClick={() => !selectedAnswer && onAnswer(option)}
                                disabled={!!selectedAnswer}
                                style={getOptionStyle(option)}
                                whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                                whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                                className={`border-2 rounded-xl px-5 text-left font-medium transition flex items-center justify-between gap-3 ${isKids ? "py-5 text-base" : "py-4 text-sm"
                                    }`}
                            >
                                <span className="leading-snug">{option}</span>
                                {getOptionIcon(option)}
                            </motion.button>
                        ))}
                    </div>

                    {/* Feedback */}
                    {selectedAnswer && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium text-center ${selectedAnswer === correctAnswer
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                                }`}
                        >
                            {selectedAnswer === correctAnswer
                                ? isKids
                                    ? "You got it! Great job!"
                                    : "Correct! Well done."
                                : isKids
                                    ? `Oops! The answer was: "${correctAnswer}"`
                                    : `Incorrect. The correct answer was: "${correctAnswer}"`}
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </>
    );
}