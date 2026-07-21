"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

interface Props {
    word: string;
    options: string[];
    correctAnswer: string;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (answer: string) => void;
    selectedAnswer: string | null;
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
        if (option === correctAnswer) return <FiCheck size={16} className="text-green-500 flex-shrink-0" />;
        if (option === selectedAnswer && option !== correctAnswer)
            return <FiX size={16} className="text-red-500 flex-shrink-0" />;
        return null;
    };

    return (
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
                        <span style={{ color: "var(--text-muted)" }} className="text-sm font-medium">
                            Question {questionNumber} of {totalQuestions}
                        </span>
                        <span style={{ color: "var(--accent)" }} className="text-sm font-bold">
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
                                width: `${((questionNumber - 1) / totalQuestions) * 100}%`,
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
                    <p style={{ color: "var(--text-muted)" }} className="text-sm font-medium mb-3">
                        What is the meaning of this word?
                    </p>
                    <h2
                        style={{ color: "var(--text-primary)" }}
                        className="text-4xl font-bold tracking-wide"
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
                            className="border-2 rounded-xl px-5 py-4 text-left text-sm font-medium transition flex items-center justify-between gap-3"
                        >
                            <span className="leading-snug">{option}</span>
                            {getOptionIcon(option)}
                        </motion.button>
                    ))}
                </div>

                {/* Feedback message */}
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
                            ? "Correct! Well done."
                            : `Incorrect. The correct answer was: "${correctAnswer}"`}
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}