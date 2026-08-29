"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiSkipForward } from "react-icons/fi";

interface Props {
    word: string;
    meaning: string;
    pronunciation?: string;
    sentence?: string;
    questionNumber: number;
    totalQuestions: number;
    onCorrect: () => void;
    onSkip: () => void;
    onWrong: (typedWord: string) => void;
}

export default function TypingCard({
    word,
    meaning,
    pronunciation,
    sentence,
    questionNumber,
    totalQuestions,
    onCorrect,
    onSkip,
    onWrong,
}: Props) {
    const [typed, setTyped] = useState("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState<"correct" | "wrong" | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto focus input
    useEffect(() => {
        inputRef.current?.focus();
    }, [questionNumber]);

    // Timer
    useEffect(() => {
        if (submitted) return;
        if (timeLeft === 0) {
            handleSubmit(true);
            return;
        }
        const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, submitted]);

    const handleSubmit = (timedOut = false) => {
        if (submitted) return;
        setSubmitted(true);

        const isCorrect =
            !timedOut &&
            typed.trim().toLowerCase() === word.toLowerCase();

        setResult(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
            setTyped("");
            setTimeLeft(30);
            setSubmitted(false);
            setResult(null);
            if (isCorrect) {
                onCorrect();
            } else {
                onWrong(typed.trim());
            }
        }, 1500);
    };

    // Character-by-character color feedback
    const renderTyped = () => {
        return typed.split("").map((char, i) => {
            const expected = word[i]?.toLowerCase();
            const actual = char.toLowerCase();
            const correct = actual === expected;
            return (
                <span
                    key={i}
                    style={{ color: correct ? "#22c55e" : "#ef4444" }}
                    className="font-bold"
                >
                    {char}
                </span>
            );
        });
    };

    const timerColor =
        timeLeft > 15 ? "#22c55e" : timeLeft > 7 ? "#f59e0b" : "#ef4444";

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={questionNumber}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-auto"
            >
                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span
                            style={{ color: "var(--text-muted)" }}
                            className="text-sm font-medium"
                        >
                            Word {questionNumber} of {totalQuestions}
                        </span>
                        <div
                            style={{ color: timerColor }}
                            className="flex items-center gap-1.5 text-sm font-bold"
                        >
                            <FiClock size={14} />
                            {timeLeft}s
                        </div>
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

                {/* Timer bar */}
                <div
                    style={{ backgroundColor: "var(--border-color)" }}
                    className="w-full h-1.5 rounded-full overflow-hidden mb-6"
                >
                    <motion.div
                        style={{ backgroundColor: timerColor }}
                        className="h-full rounded-full"
                        initial={{ width: "100%" }}
                        animate={{ width: `${(timeLeft / 30) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                    />
                </div>

                {/* Meaning card */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-color)",
                    }}
                    className="border rounded-2xl p-8 mb-6 shadow-sm"
                >
                    <p
                        style={{ color: "var(--accent)" }}
                        className="text-xs font-bold uppercase tracking-widest mb-3"
                    >
                        Type the word that means:
                    </p>
                    <p
                        style={{ color: "var(--text-primary)" }}
                        className="text-2xl font-bold leading-relaxed mb-4"
                    >
                        {meaning}
                    </p>

                    {sentence && (
                        <div
                            style={{
                                borderColor: "var(--accent)",
                                backgroundColor: "var(--accent-soft)",
                            }}
                            className="border-l-4 pl-4 py-2 rounded-r-xl"
                        >
                            <p
                                style={{ color: "var(--text-secondary)" }}
                                className="text-sm italic"
                            >
                                &ldquo;{sentence}&rdquo;
                            </p>
                        </div>
                    )}

                    {pronunciation && (
                        <p
                            style={{ color: "var(--text-muted)" }}
                            className="text-sm mt-3"
                        >
                            Pronunciation: /{pronunciation}/
                        </p>
                    )}
                </div>

                {/* Input */}
                <div
                    style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor:
                            result === "correct"
                                ? "#22c55e"
                                : result === "wrong"
                                    ? "#ef4444"
                                    : "var(--border-color)",
                    }}
                    className="border-2 rounded-2xl p-5 mb-4 shadow-sm transition-colors"
                >
                    <p
                        style={{ color: "var(--text-muted)" }}
                        className="text-xs font-medium mb-3"
                    >
                        Your answer:
                    </p>

                    {/* Character preview */}
                    <div className="text-3xl font-mono tracking-widest mb-4 min-h-[2.5rem]">
                        {typed.length > 0 ? (
                            renderTyped()
                        ) : (
                            <span style={{ color: "var(--border-color)" }}>
                                {Array.from({ length: word.length })
                                    .map(() => "_")
                                    .join(" ")}
                            </span>
                        )}
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={typed}
                        onChange={(e) => {
                            if (!submitted) setTyped(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !submitted && typed.length > 0) {
                                handleSubmit();
                            }
                        }}
                        placeholder="Start typing..."
                        disabled={submitted}
                        style={{
                            backgroundColor: "var(--bg-page)",
                            borderColor: "var(--border-color)",
                            color: "var(--text-primary)",
                        }}
                        className="w-full border rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
                    />
                </div>

                {/* Feedback */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`text-center text-sm font-bold py-3 rounded-xl mb-4 ${result === "correct"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                                }`}
                        >
                            {result === "correct"
                                ? "Correct! Well done."
                                : `Not quite — the answer was "${word}"`}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={() => !submitted && handleSubmit()}
                        disabled={submitted || typed.length === 0}
                        style={{ backgroundColor: "var(--accent)" }}
                        className="flex-1 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-40"
                    >
                        Submit (Enter)
                    </button>
                    <button
                        onClick={() => !submitted && onSkip()}
                        disabled={submitted}
                        style={{
                            borderColor: "var(--border-color)",
                            color: "var(--text-muted)",
                            backgroundColor: "var(--bg-card)",
                        }}
                        className="flex items-center gap-1.5 border px-4 py-3 rounded-xl text-sm font-medium hover:opacity-70 transition disabled:opacity-40"
                    >
                        <FiSkipForward size={15} />
                        Skip
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}